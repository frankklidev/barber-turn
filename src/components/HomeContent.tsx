/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import ExceptionalFeatures from './ExceptionalFeatures';
import ImageTextComponent from './ImageTextComponent';
import MapComponent from './MapComponent'; // Import the MapComponent

interface HomeContentProps {
  navigate: ReturnType<typeof useNavigate>;
  session: any;
}

const HomeContent: React.FC<HomeContentProps> = ({ navigate, session }) => {
  const handleReserveNow = () => {
    if (session) {
      navigate('/reservar');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Hero handleReserveNow={handleReserveNow} />
      <ExceptionalFeatures />
      <div className="flex flex-col w-full lg:flex-row mt-8 mx-2">
        <ImageTextComponent />
      </div>
      <div className="flex flex-col w-full lg:flex-row mt-8 mx-2">
        <MapComponent /> {/* Add the MapComponent here */}
      </div>
    </div>
  );
}

export default HomeContent;
