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

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);

      if (session) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching user role:', error);
        } else {
          setUserRole(userData.role);
        }
      }
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
            console.error('Error fetching user role:', error);
          } else {
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

  if (isAuthenticated === null) {
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

  if (isAuthenticated && (!requiredRole || userRole === requiredRole || userRole === 'admin')) {
    return element;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
