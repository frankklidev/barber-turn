/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import image from '../assets/fondo4.webp'; // Asegúrate de que la ruta sea correcta
import MapComponent from './MapComponent';

const ImageTextComponent: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center p-4 w-full max-w-screen-lg mx-auto overflow-hidden">
      <div className="flex-shrink-0 w-full md:w-3/4 lg:w-1/2 mb-4 lg:mb-0 lg:mr-10 flex justify-center">
        <img src={image} alt="Barbería" className="w-3/4 md:w-2/3 lg:w-full h-auto rounded-lg shadow-md" />
      </div>
      <div className="flex-grow p-4 lg:p-8 text-center text-gray-800 dark:text-gray-100">
        <h2 className="text-3xl font-bold mb-4 font-serif">Encuéntranos Aquí</h2>
        <p className="text-lg mb-2 font-sans">Nuestra ubicación está marcada en el mapa a continuación:</p>
        <div className="flex justify-center overflow-hidden">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default ImageTextComponent;
