/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import image from '../assets/fondo4.webp';
import { supabase } from '../supabaseClient';

const HomeContent = lazy(() => import('./HomeContent'));

const Home: React.FC = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      setIsImageLoaded(true);
    };

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 10;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

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

  const progressBarStyle = {
    "--value": progress.toString(),
    "--size": "12rem",
    "--thickness": "2px"
  } as React.CSSProperties;

  return (
    <div className={isImageLoaded ? 'background-loaded-home' : 'min-h-screen'}>
      <div className="hero-overlay bg-opacity-60 absolute inset-0"></div>
      {isImageLoaded ? (
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-screen">
            <div className="radial-progress" style={progressBarStyle} role="progressbar">{progress}%</div>
          </div>
        }>
          <HomeContent navigate={navigate} session={session} />
        </Suspense>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <div className="radial-progress" style={progressBarStyle} role="progressbar">{progress}%</div>
        </div>
      )}
    </div>
  );
}

export default Home;
