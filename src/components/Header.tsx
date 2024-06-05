/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';

const Header: React.FC = () => {
  const [theme, setTheme] = useState('light');
  const [session, setSession] = useState<any>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      } else {
        setSession(data.session);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    setIsLoggingOut(false);
    window.location.href = '/';
  };

  const getInitial = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-primary text-white p-4 flex justify-between items-center">
      {session ? (
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-12 h-12 flex items-center justify-center ring ring-primary ring-offset-base-100 ring-offset-2">
            <span className="text-2xl font-bold">{getInitial(session.user.email)}</span>
          </div>
        </div>
      ) : (
        <Link to="/" className="text-2xl font-bold">Mi Barbería</Link>
      )}
      <div className="flex items-center gap-4">
        {session ? (
          <button onClick={handleLogout} className="flex items-center gap-2 text-white" disabled={isLoggingOut}>
            <FaSignOutAlt className="w-5 h-5" />
            <span>Cerrar Sesión</span>
            {isLoggingOut && (
              <div className="loader border-t-4 border-white rounded-full w-5 h-5 animate-spin"></div>
            )}
          </button>
        ) : (
          <>
            <Link to="/login" className="flex items-center gap-2 text-white">
              <FaSignInAlt className="w-5 h-5" />
              <span>Iniciar Sesión</span>
            </Link>
            <Link to="/register" className="flex items-center gap-2 text-white">
              <FaUserPlus className="w-5 h-5" />
              <span>Registrarse</span>
            </Link>
          </>
        )}
        <label className="flex cursor-pointer gap-2 ml-auto">
          <FaSun className="w-5 h-5" />
          <input type="checkbox" className="toggle theme-controller" onChange={toggleTheme} checked={theme === 'dark'} />
          <FaMoon className="w-5 h-5" />
        </label>
      </div>
    </header>
  );
};

export default Header;
