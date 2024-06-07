/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export interface Service {
  id: number;
  name: string;
  price: number;
}

interface ReservationContentProps {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  timeSlots: string[];
  selectedTimeSlot: string;
  setSelectedTimeSlot: React.Dispatch<React.SetStateAction<string>>;
  selectedServices: Service[];
  servicesList: Service[];
  toggleService: (service: Service) => void;
  handleSubmit: (event: React.FormEvent) => void;
  showAlert: boolean;
  reservationDetails: { date: string, timeSlot: string, services: Service[] };
  calculateTotal: () => number;
  isLoadingServices: boolean;  // Nuevo prop para controlar la carga de servicios
}

const ReservationContent: React.FC<ReservationContentProps> = ({
  date,
  setDate,
  timeSlots,
  selectedTimeSlot,
  setSelectedTimeSlot,
  selectedServices,
  servicesList,
  toggleService,
  handleSubmit,
  showAlert,
  reservationDetails,
  calculateTotal,
  isLoadingServices  // Nuevo prop para controlar la carga de servicios
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
            <span>Turno reservado para el {reservationDetails.date} de {reservationDetails.timeSlot}. Servicios: {reservationDetails.services.map(service => service.name).join(', ')}</span>
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
            {isLoadingServices ? (  // Mostrar loader si los servicios están cargando
              <div className="flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="space-y-2">
                {servicesList.map((service) => (
                  <label key={service.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={selectedServices.some(s => s.id === service.id)}
                      onChange={() => toggleService(service)}
                    />
                    <span className="label-text">{service.name} - ${service.price}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Total a pagar</span>
            </label>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Total</div>
                <div className="stat-value">${calculateTotal()}</div>
                <div className="stat-desc">Incluye todos los servicios seleccionados</div>
              </div>
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
