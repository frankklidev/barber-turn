/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import MapComponent from "./MapComponent";

const ImageTextComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-screen-lg mx-auto overflow-hidden h-96">
      <div className="card lg:card-side bg-base-100 shadow-xl h-full">
        <figure className="w-full lg:w-1/2">
          <div className="w-full h-64 lg:h-full">
            <MapComponent />
          </div>
        </figure>
        <div className="card-body w-full lg:w-1/2 flex items-center justify-center">
          <div className="text-center">
            <h2 className="card-title mb-4">Aquí nos encontramos</h2>
            <p>Nuestra ubicación está marcada en el mapa a continuación:</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageTextComponent;
