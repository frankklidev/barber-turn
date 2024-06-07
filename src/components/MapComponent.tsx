/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const position: LatLngExpression = [23.1135925, -82.3665956]; // Coordenadas de La Habana, Cuba

const MapComponent: React.FC = () => {
  return (
    <div className="flex-grow h-60 w-full md:h-80 lg:h-[500px] xl:h-[600px] m-2 p-4 mx-auto">
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Aquí está nuestra barbería.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
