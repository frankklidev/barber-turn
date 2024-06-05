/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeContentProps {
  navigate: ReturnType<typeof useNavigate>;
  session: any;
}

const HomeContent: React.FC<HomeContentProps> = ({ navigate, session }) => {
  const handleReserveNow = () => {
    if (session) {
      navigate('/reservar');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="hero-content text-center text-neutral-content relative z-10 flex flex-col items-center justify-center">
      <div className="max-w-md typewriter">
        <h1 className="mb-5 text-5xl font-bold">Bienvenido</h1>
        <p className="mb-5">Reserva tu turno en nuestra barbería.</p>
        <button className="btn btn-primary" onClick={handleReserveNow}>Reservar Ahora</button>
      </div>
    </div>
  );
}

export default HomeContent;
