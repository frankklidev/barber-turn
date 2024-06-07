/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { supabase } from '../supabaseClient';
import '../App.css';
import { Service } from './ReservationContent';

const ReservationContent = lazy(() => import('./ReservationContent'));

const Reservation: React.FC = () => {
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoadingServices, setIsLoadingServices] = useState(true);  // Nuevo estado para controlar la carga de servicios
  const [reservationDetails, setReservationDetails] = useState<{ date: string, timeSlot: string, services: Service[] }>({ date: '', timeSlot: '', services: [] });

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
      setIsLoadingServices(false);  // Marcar que los servicios han sido cargados
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 8; i <= 17; i++) {
      slots.push(`${i}:00 - ${i + 1}:00`);
    }
    return slots;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setReservationDetails({ date, timeSlot: selectedTimeSlot, services: selectedServices });
    setShowAlert(true);

    setDate('');
    setSelectedTimeSlot('');
    setSelectedServices([]);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
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
    <div className="min-h-screen flex justify-center items-center">
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>}>
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
          showAlert={showAlert}
          reservationDetails={reservationDetails}
          calculateTotal={calculateTotal}
        />
      </Suspense>
    </div>
  );
};

export default Reservation;
