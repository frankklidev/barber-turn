import React from 'react';

const servicesList = [
  'Corte de cabello',
  'Afeitado',
  'Mascarilla facial',
  'Tinte de cabello',
  'Tratamiento capilar'
];

interface ReservationContentProps {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  timeSlots: string[];
  selectedTimeSlot: string;
  setSelectedTimeSlot: React.Dispatch<React.SetStateAction<string>>;
  selectedServices: string[];
  toggleService: (service: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  showAlert: boolean;
  reservationDetails: { date: string, timeSlot: string, services: string[] };
}

const ReservationContent: React.FC<ReservationContentProps> = ({
  date,
  setDate,
  timeSlots,
  selectedTimeSlot,
  setSelectedTimeSlot,
  selectedServices,
  toggleService,
  handleSubmit,
  showAlert,
  reservationDetails
}) => {
  return (
    <div className="card w-full max-w-lg shadow-xl bg-base-100 bg-opacity-80 p-4 rounded-lg">
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold mb-4">Reservar Turnos</h2>
        {showAlert && (
          <div role="alert" className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Turno reservado para el {reservationDetails.date} de {reservationDetails.timeSlot}. Servicios: {reservationDetails.services.join(', ')}</span>
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
  );
};

export default ReservationContent;
