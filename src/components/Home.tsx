import React, { useState, useEffect } from 'react';
import background from '../assets/fondo.webp';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const Home: React.FC = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = background;
    img.onload = () => {
      setIsImageLoaded(true);
    };
  }, []);

  return (
    <div className={isImageLoaded ? 'background-loaded-home' : 'min-h-screen flex justify-center items-center'}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md typewriter">
          <h1 className="mb-5 text-5xl font-bold">Bienvenido</h1>
          <p className="mb-5">Reserva tu turno en nuestra barbería.</p>
          <button className="btn btn-primary" onClick={() => navigate('/reservar')}>Reservar Ahora</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
