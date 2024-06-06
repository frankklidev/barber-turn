/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FaStar, FaCut, FaHandSparkles } from 'react-icons/fa';

const ExceptionalFeatures: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-8 px-4 mr-12">
      <div className="card w-full lg:w-1/3 bg-base-300 shadow-xl p-4 mb-4 lg:mb-0">
        <div className="flex items-center mb-4">
          <FaStar className="w-8 h-8 text-yellow-500 mr-2" />
          <h2 className="text-2xl font-bold">Servicio de Calidad</h2>
        </div>
        <p>Ofrecemos cortes de cabello y afeitados de alta calidad realizados por barberos profesionales con años de experiencia.</p>
      </div>
      <div className="card w-full lg:w-1/3 bg-base-300 shadow-xl p-4 mb-4 lg:mb-0">
        <div className="flex items-center mb-4">
          <FaCut className="w-8 h-8 text-red-500 mr-2" />
          <h2 className="text-2xl font-bold">Equipamiento Moderno</h2>
        </div>
        <p>Contamos con el equipamiento más moderno y de última generación para garantizarte un servicio impecable y seguro.</p>
      </div>
      <div className="card w-full lg:w-1/3 bg-base-300 shadow-xl p-4">
        <div className="flex items-center mb-4">
          <FaHandSparkles className="w-8 h-8 text-green-500 mr-2" />
          <h2 className="text-2xl font-bold">Ambiente Agradable</h2>
        </div>
        <p>Nuestra barbería ofrece un ambiente relajado y agradable, ideal para desconectar y disfrutar de una experiencia única.</p>
      </div>
    </div>
  );
}

export default ExceptionalFeatures;
