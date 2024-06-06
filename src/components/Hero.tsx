/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import backgroundImage from '../assets/fondo.webp';

interface HeroProps {
  handleReserveNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ handleReserveNow }) => {
  return (
    <div className="hero bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content relative z-10 flex flex-col items-center justify-center">
        <div className="max-w-md typewriter">
          <h1 className="mb-5 text-5xl font-bold">Bienvenido</h1>
          <p className="mb-5">Reserva tu turno.</p>
          <button className="btn btn-primary" onClick={handleReserveNow}>
            Reservar Ahora
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
