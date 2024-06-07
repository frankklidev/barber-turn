/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import ExceptionalFeatures from './ExceptionalFeatures';
import ImageTextComponent from './ImageTextComponent';

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
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      <Hero handleReserveNow={handleReserveNow} />
      <div className="flex flex-col w-full lg:flex-row mt-8 mx-2 items-center mb-8">
        <ExceptionalFeatures />
      </div>
      <div className="flex flex-col w-full lg:flex-row mt-8 mx-2 items-center mb-8">
        <ImageTextComponent />
      </div>
    </div>
  );
}

export default HomeContent;
