/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import css for carousel
import { Carousel } from 'react-responsive-carousel';
import { FaBell, FaClock, FaHistory, FaMobileAlt, FaTags } from 'react-icons/fa';

const cardDimensions = "w-80 h-96"; // Clases para ancho y alto

const ExceptionalFeatures: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-8 px-4 w-full lg:w-3/4 mx-auto">
      <div className="hidden lg:block">
        <Carousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          interval={3000}
          centerMode={true}
          centerSlidePercentage={33.33} // Ajuste para mostrar 3 cards
          className="space-x-4" // Añadir espaciado entre tarjetas
        >
          {[
            { title: 'Facilidad de Uso', text: 'Reserva tu turno en pocos pasos.', icon: <FaMobileAlt className="w-16 h-16 text-blue-500 mx-auto" /> },
            { title: 'Disponibilidad 24/7', text: 'Reserva en cualquier momento y desde cualquier lugar.', icon: <FaClock className="w-16 h-16 text-yellow-500 mx-auto" /> },
            { title: 'Confirmaciones Instantáneas', text: 'Recibe notificaciones al instante.', icon: <FaBell className="w-16 h-16 text-red-500 mx-auto" /> },
            { title: 'Historial de Reservas', text: 'Consulta y gestiona tus reservas fácilmente.', icon: <FaHistory className="w-16 h-16 text-green-500 mx-auto" /> },
            { title: 'Promociones Exclusivas', text: 'Accede a ofertas y descuentos especiales.', icon: <FaTags className="w-16 h-16 text-purple-500 mx-auto" /> }
          ].map((feature, index) => (
            <div key={index} className={`card bg-base-100 shadow-xl ${cardDimensions} mx-2 flex flex-col items-center justify-center`}>
            <div className="card-body h-2/3 flex flex-col items-center justify-center">
              {feature.icon}
            </div>
              <div className="card-body h-1/3">
                <h2 className="card-title">{feature.title}</h2>
                <p>{feature.text}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="block lg:hidden">
        <Carousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          interval={3000}
          axis="vertical" // Ajuste para carrusel vertical en pantallas móviles
          centerMode={false} // Evita mostrar parcialmente las tarjetas
          centerSlidePercentage={100} // Asegura que una tarjeta ocupe el ancho completo
        >
          {[
            { title: 'Facilidad de Uso', text: 'Reserva tu turno en pocos pasos.', icon: <FaMobileAlt className="w-16 h-16 text-blue-500 mx-auto" /> },
            { title: 'Disponibilidad 24/7', text: 'Reserva en cualquier momento y desde cualquier lugar.', icon: <FaClock className="w-16 h-16 text-yellow-500 mx-auto" /> },
            { title: 'Confirmaciones Instantáneas', text: 'Recibe notificaciones al instante.', icon: <FaBell className="w-16 h-16 text-red-500 mx-auto" /> },
            { title: 'Historial de Reservas', text: 'Consulta y gestiona tus reservas fácilmente.', icon: <FaHistory className="w-16 h-16 text-green-500 mx-auto" /> },
            { title: 'Promociones Exclusivas', text: 'Accede a ofertas y descuentos especiales.', icon: <FaTags className="w-16 h-16 text-purple-500 mx-auto" /> }
          ].map((feature, index) => (
            <div key={index} className={`card bg-base-100 shadow-xl ${cardDimensions} mx-2 flex flex-col items-center justify-center`}>
              <div className="card-body h-2/3 flex flex-col items-center justify-center">
                {feature.icon}
              </div>
              <div className="card-body h-1/3">
                <h2 className="card-title">{feature.title}</h2>
                <p>{feature.text}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default ExceptionalFeatures;


