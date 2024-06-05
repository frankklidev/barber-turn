import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) {
    const progressBarStyle: React.CSSProperties = {
      '--value': 70,
      '--size': '3rem',
      '--thickness': '3px'
    } as React.CSSProperties;

    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="radial-progress animate-spin" style={progressBarStyle}></div>
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
