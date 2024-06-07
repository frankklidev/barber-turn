/* eslint-disable @typescript-eslint/no-explicit-any */
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
      const availableTimeSlots = generateTimeSlots();
      setTimeSlots(availableTimeSlots);
      setSelectedTimeSlot('');
    }
  }, [date]);

  const fetchServices = async () => {
    const { data, error } = await supabase.from('services').select('*');
    if (error) {
      console.error(error);
    } else {
      setServicesList(data);
      setIsLoadingServices(false);
    }
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
      console.error('Usuario no autenticado');
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
      console.error('Error al reservar turno:', error);
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
    <div className="min-h-screen flex justify-center items-center overflow-x-hidden -mt-44 -mb-11">
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
