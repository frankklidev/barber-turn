/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const HomeContent = lazy(() => import('./HomeContent'));

const Home: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
        <HomeContent navigate={navigate} session={session} />
      </Suspense>
    </div>
  );
}

export default Home;
