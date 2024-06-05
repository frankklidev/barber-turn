import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import image from '../assets/fondo4.webp';

const HomeContent = lazy(() => import('./HomeContent'));

const Home: React.FC = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
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
          <HomeContent navigate={navigate} />
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
