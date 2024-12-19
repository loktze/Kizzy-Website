// src/pages/Home.tsx
import React from 'react';
import { ScrollProvider } from '../hooks/useScroll';
import MainContent from '../components/MainContent';
import PhonePortal from '../components/PhonePortal';

const Home: React.FC = () => {
  return (
    <ScrollProvider>
      <div className="relative bg-white">
        <MainContent />
        <PhonePortal />
      </div>
    </ScrollProvider>
  );
};

export default Home;
