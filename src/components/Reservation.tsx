import React, { useState, useEffect } from 'react';

const servicesList = [
  'Corte de cabello',
  'Afeitado',
  'Mascarilla facial',
  'Tinte de cabello',
  'Tratamiento capilar'
];

const Reservation: React.FC = () => {
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (date) {
      // Simular la obtención de horarios disponibles
      const availableTimeSlots = generateTimeSlots();
      setTimeSlots(availableTimeSlots);
      setSelectedTimeSlot(''); // Resetear el horario seleccionado
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
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000); // Oculta la alerta después de 5 segundos
  };

  const toggleService = (service: string) => {
    setSelectedServices((prevServices) => 
      prevServices.includes(service) 
        ? prevServices.filter(s => s !== service) 
        : [...prevServices, service]
    );
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="card w-full max-w-lg shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold mb-4">Reservar Turno</h2>
          {showAlert && (
            <div role="alert" className="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Turno reservado para el {date} de {selectedTimeSlot}. Servicios: {selectedServices.join(', ')}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Fecha</span>
              </label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                className="input input-bordered" 
                required 
              />
            </div>
            {date && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Horarios disponibles</span>
                </label>
                <select 
                  value={selectedTimeSlot} 
                  onChange={(e) => setSelectedTimeSlot(e.target.value)} 
                  className="select select-bordered text-lg" 
                  required
                >
                  <option value="" disabled>Seleccione un horario</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Servicios</span>
              </label>
              <div className="space-y-2">
                {servicesList.map((service) => (
                  <label key={service} className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-primary" 
                      checked={selectedServices.includes(service)}
                      onChange={() => toggleService(service)}
                    />
                    <span className="label-text">{service}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Servicios seleccionados</span>
              </label>
              <div className="space-x-2">
                {selectedServices.map((service) => (
                  <span key={service} className="badge badge-primary">{service}</span>
                ))}
              </div>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">Reservar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
