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

const AdminReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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
    setLoading(false);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReservations = reservations.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Reservas</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
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
              {currentReservations.map((reservation) => (
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
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(reservations.length / itemsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-secondary'} mx-1`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminReservations;
