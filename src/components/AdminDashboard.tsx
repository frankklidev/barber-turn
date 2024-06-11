import React from 'react';
import AdminReservations from './AdminReservations';
import AdminServices from './AdminServices';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Administración</h2>
        <div className="flex flex-col md:flex-row">
          <Link to="/admin/reservations" className="btn btn-primary md:mr-2 mb-2 md:mb-0">
            Ver Reservas
          </Link>
          <Link to="/admin/services" className="btn btn-primary">
            Gestionar Servicios
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-md mt-4">
        <Routes>
          <Route path="reservations" element={<AdminReservations />} />
          <Route path="services" element={<AdminServices />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
