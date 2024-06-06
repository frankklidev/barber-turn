/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const ScheduleComponent: React.FC = () => {
  return (
    <div className="grid flex-grow h-96 card bg-base-300 rounded-box place-items-center m-2 p-4">
      <div className="w-full h-full flex flex-col items-center justify-center text-black">
        <h2 className="text-2xl font-bold mb-4">Horario</h2>
        <ul className="text-lg">
          <li>Lunes - Viernes: 9:00 AM - 7:00 PM</li>
          <li>Sábado: 10:00 AM - 5:00 PM</li>
          <li>Domingo: Cerrado</li>
        </ul>
      </div>
    </div>
  );
};

export default ScheduleComponent;
