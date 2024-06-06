/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import image from '../assets/fondo4.webp'; // Asegúrate de que la ruta sea correcta

const ImageTextComponent: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-start p-4 bg-white rounded-lg shadow-lg w-full max-w-screen-lg mx-auto">
      <div className="flex-shrink-0 w-full lg:w-1/2 mb-4 lg:mb-0 lg:mr-10">
        <img src={image} alt="Barbería" className="w-full h-auto rounded-lg shadow-md" />
      </div>
      <div className="flex-grow p-4 lg:p-8">
        <h2 className="text-3xl font-bold mb-4 font-serif">Datos Interesantes sobre las Barberías</h2>
        <p className="text-lg mb-2 font-sans">Las barberías tienen una historia que se remonta a miles de años. En el antiguo Egipto, los barberos no solo cortaban el cabello sino que también realizaban rituales religiosos.</p>
        <p className="text-lg mb-2 font-sans">El poste de barbero, con sus rayas rojas, blancas y azules, simboliza la práctica medieval de la sangría, que realizaban los barberos-cirujanos.</p>
        <p className="text-lg font-sans">Hoy en día, las barberías están experimentando un renacimiento, con una mezcla de tradición y modernidad, ofreciendo servicios personalizados en un ambiente social.</p>
      </div>
    </div>
  );
};

export default ImageTextComponent;
