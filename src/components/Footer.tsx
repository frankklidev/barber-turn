import React from 'react';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white p-6 flex flex-col md:flex-row justify-between items-center mt-auto">
      <div>
        <h2 className="text-lg font-bold">Mi Proyecto</h2>
        <p>© 2024 Mi Proyecto. Todos los derechos reservados.</p>
      </div>
      <div className="mt-4 md:mt-0">
        <h2 className="text-lg font-bold flex items-center gap-2"><FaCalendarAlt /> Horarios</h2>
        <ul className="mt-2 space-y-1">
          <li className="flex items-center gap-2"><FaClock /> Lunes - Viernes: 9:00 AM - 7:00 PM</li>
          <li className="flex items-center gap-2"><FaClock /> Sábado: 10:00 AM - 5:00 PM</li>
          <li className="flex items-center gap-2"><FaClock /> Domingo: Cerrado</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
