import React, { useState, useEffect, lazy, Suspense } from 'react';
import backgroundImage from '../assets/fondo4.webp';
import '../App.css';

const ReservationContent = lazy(() => import('./ReservationContent'));

const Reservation: React.FC = () => {
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedServices, setSelectedServices] = useState<{ name: string, price: number }[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reservationDetails, setReservationDetails] = useState<{ date: string, timeSlot: string, services: { name: string, price: number }[] }>({ date: '', timeSlot: '', services: [] });

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => {
      setIsImageLoaded(true);
    };

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 10;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (date) {
      const availableTimeSlots = generateTimeSlots();
      setTimeSlots(availableTimeSlots);
      setSelectedTimeSlot('');
    }
  }, [date]);

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

  const toggleService = (service: { name: string, price: number }) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(service)
        ? prevServices.filter(s => s.name !== service.name)
        : [...prevServices, service]
    );
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const progressBarStyle = {
    "--value": progress.toString(),
    "--size": "12rem",
    "--thickness": "2px"
  } as React.CSSProperties;

  return (
    <div className={isImageLoaded ? 'background-loaded' : 'min-h-screen flex justify-center items-center'}>
      {!isImageLoaded && (
        <div className="flex justify-center items-center min-h-screen">
          <div className="radial-progress" style={progressBarStyle} role="progressbar">{progress}%</div>
        </div>
      )}
      {isImageLoaded && (
        <>
          <div className="hero-overlay"></div>
          <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen">
              <div className="radial-progress" style={progressBarStyle} role="progressbar">{progress}%</div>
            </div>
          }>
            <ReservationContent
              date={date}
              setDate={setDate}
              timeSlots={timeSlots}
              selectedTimeSlot={selectedTimeSlot}
              setSelectedTimeSlot={setSelectedTimeSlot}
              selectedServices={selectedServices}
              toggleService={toggleService}
              handleSubmit={handleSubmit}
              showAlert={showAlert}
              reservationDetails={reservationDetails}
              calculateTotal={calculateTotal}
            />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Reservation;
