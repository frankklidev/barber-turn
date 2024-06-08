import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Reservation = {
  id: string;
  date: string;
  time_slot: string;
  services: number[];
  user: { name: string; email: string };
};

type Service = {
  id: number;
  name: string;
  price: number;
};

const AdminDashboard: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchReservations();
    fetchServices();
  }, []);

  const fetchReservations = async () => {
    const { data, error } = await supabase
      .from('reservations')
      .select('id, date, time_slot, services, user_id');

    if (error) {
      toast.error('Error al cargar las reservas');
    } else {
      const usersData = await Promise.all(
        data.map(async (reservation) => {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('name, email')
            .eq('id', reservation.user_id)
            .single();

          if (userError) {
            console.error('Error fetching user data:', userError);
          }

          return {
            ...reservation,
            user: userData,
          };
        })
      );

      setReservations(usersData as Reservation[]);
    }
  };

  const fetchServices = async () => {
    const { data, error } = await supabase.from('services').select('*');

    if (error) {
      toast.error('Error al cargar los servicios');
    } else {
      setServices(data as Service[]);
    }
  };

  const calculateTotal = (serviceIds: number[]): number => {
    return serviceIds.reduce((total, id) => {
      const service = services.find((s) => s.id === id);
      return total + (service ? service.price : 0);
    }, 0);
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Reservas</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th className="p-2">Fecha</th>
            <th className="p-2">Horario</th>
            <th className="p-2">Servicios</th>
            <th className="p-2">Cliente</th>
            <th className="p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td className="p-2">{reservation.date}</td>
              <td className="p-2">{reservation.time_slot}</td>
              <td className="p-2">
                {reservation.services
                  .map((id) => services.find((s) => s.id === id)?.name)
                  .join(', ')}
              </td>
              <td className="p-2">{reservation.user?.name}</td>
              <td className="p-2">${calculateTotal(reservation.services)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
