/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const position: LatLngExpression = [23.1135925, -82.3665956]; // Coordenadas de La Habana, Cuba

const MapComponent: React.FC = () => {
  return (
    <div className="grid flex-grow h-96 lg:h-[500px] card bg-base-300 rounded-box place-items-center m-2 p-4">
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '10px' }}>
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
