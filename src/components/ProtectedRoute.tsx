import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

interface ProtectedRouteProps {
  element: React.ReactElement;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      setIsAuthenticated(!!session);

      if (session) {
        console.log('Session found, fetching user role...');
        const { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching user role:', error);
        } else {
          console.log('User role from DB:', userData.role);
          setUserRole(userData.role);
        }
      }
      setIsLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);

      if (session) {
        const fetchUserRole = async () => {
          const { data: userData, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching user role on state change:', error);
          } else {
            console.log('Fetched user role on state change:', userData.role);
            setUserRole(userData.role);
          }
        };

        fetchUserRole();
      } else {
        setUserRole(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    const progressBarStyle: React.CSSProperties = {
      '--value': 70,
      '--size': '3rem',
      '--thickness': '3px',
    } as React.CSSProperties;

    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="radial-progress animate-spin" style={progressBarStyle}></div>
      </div>
    );
  }

  console.log('User role:', userRole);

  if (isAuthenticated && (!requiredRole || userRole === requiredRole || userRole === 'admin')) {
    return element;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
