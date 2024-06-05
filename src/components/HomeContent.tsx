import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeContentProps {
  navigate: ReturnType<typeof useNavigate>;
}

const HomeContent: React.FC<HomeContentProps> = ({ navigate }) => {
  return (
    <div className="hero-content text-center text-neutral-content relative z-10 flex flex-col items-center justify-center">
      <div className="max-w-md typewriter">
        <h1 className="mb-5 text-5xl font-bold">Bienvenido</h1>
        <p className="mb-5">Reserva tu turno en nuestra barbería de manera fácil y rápida. Disfruta de una experiencia única con nuestros servicios profesionales.</p>
        <button className="btn btn-primary" onClick={() => navigate('/reservar')}>Reservar Ahora</button>
      </div>
    </div>
  );
}

export default HomeContent;
