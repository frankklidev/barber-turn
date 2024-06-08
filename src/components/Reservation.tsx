import React, { useState, useEffect, lazy, Suspense } from 'react';
import { supabase } from '../supabaseClient';
import '../App.css';
import { Service } from './ReservationContent';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReservationContent = lazy(() => import('./ReservationContent'));

const Reservation: React.FC = () => {
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (date) {
      fetchAvailableTimeSlots(date);
    }
  }, [date]);

  const fetchServices = async () => {
    const { data, error } = await supabase.from('services').select('*');
    if (error) {
      toast.error('Error al cargar los servicios', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: 'colored'
      });
    } else {
      setServicesList(data);
      setIsLoadingServices(false);
    }
  };

  const fetchAvailableTimeSlots = async (selectedDate: string) => {
    const { data: reservations, error } = await supabase
      .from('reservations')
      .select('time_slot')
      .eq('date', selectedDate);

    if (error) {
      toast.error('Error al cargar los horarios disponibles', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: 'colored'
      });
      return;
    }

    const reservedSlots = reservations.map(reservation => reservation.time_slot);
    const availableTimeSlots = generateTimeSlots().filter(slot => !reservedSlots.includes(slot));
    setTimeSlots(availableTimeSlots);
    setSelectedTimeSlot('');
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 8; i <= 17; i++) {
      slots.push(`${i}:00 - ${i + 1}:00`);
    }
    return slots;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
      toast.error('Usuario no autenticado', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: 'colored'
      });
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from('reservations')
      .insert([
        {
          date: date,
          time_slot: selectedTimeSlot,
          services: selectedServices.map(service => service.id),
          user_id: user.id,
        },
      ]);

    if (error) {
      toast.error('Error al reservar el turno', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: 'colored'
      });
    } else {
      toast.success('Turno reservado con éxito', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: 'colored'
      });

      setDate('');
      setSelectedTimeSlot('');
      setSelectedServices([]);
    }

    setIsSubmitting(false);
  };

  const toggleService = (service: Service) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(service)
        ? prevServices.filter(s => s.id !== service.id)
        : [...prevServices, service]
    );
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  return (
    <div className="min-h-screen flex justify-center items-center overflow-x-hidden -mt-24 -mb-11">
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>}>
        <ToastContainer />
        <ReservationContent
          date={date}
          setDate={setDate}
          timeSlots={timeSlots}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
          selectedServices={selectedServices}
          servicesList={servicesList}
          isLoadingServices={isLoadingServices}
          toggleService={toggleService}
          handleSubmit={handleSubmit}
          calculateTotal={calculateTotal}
          isSubmitting={isSubmitting}
        />
      </Suspense>
    </div>
  );
};

export default Reservation;
