import React from 'react';
import background from '../assets/fondo.webp';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="hero min-h-screen" style={{ backgroundImage: `url(${background})` }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Bienvenido</h1>
          <p className="mb-5">Reserva tu turno en nuestra barbería de manera fácil y rápida. Disfruta de una experiencia única con nuestros servicios profesionales.</p>
          <button className="btn btn-primary" onClick={() => navigate('/reservar')}>Reservar Ahora</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
