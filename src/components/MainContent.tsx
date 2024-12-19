// src/components/MainContent.tsx
import React, { useEffect, useRef } from 'react';
import { useScroll } from '../hooks/useScroll';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';

const MainContent: React.FC = () => {
  const {
    currentSection,
    setCurrentSection,
    isAnimating,
    preventScroll
  } = useScroll();

  const touchStartY = useRef(0);
  const touchMoveY = useRef(0);
  const lastWheelDelta = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating || preventScroll) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const deltaY = e.deltaY;

      if (Math.abs(deltaY) < 10) return;

      if (deltaY > 0 && currentSection < 2) { // Allow up to section 2
        setCurrentSection(currentSection + 1);
      } else if (deltaY < 0 && currentSection > 0) {
        setCurrentSection(currentSection - 1);
      }

      lastWheelDelta.current = deltaY;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!preventScroll) {
        touchStartY.current = e.touches[0].clientY;
        touchMoveY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isAnimating || preventScroll) {
        e.preventDefault();
        return;
      }
      touchMoveY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (isAnimating || preventScroll) return;

      const deltaY = touchStartY.current - touchMoveY.current;
      const threshold = 50;

      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0 && currentSection < 2) { // Allow up to section 2
          setCurrentSection(currentSection + 1);
        } else if (deltaY < 0 && currentSection > 0) {
          setCurrentSection(currentSection - 1);
        }
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, isAnimating, preventScroll, setCurrentSection]);

  return (
    <div className="h-screen overflow-hidden">
      <div
        className="transition-transform duration-1000"
        style={{ transform: `translateY(-${currentSection * 100}vh)` }}
      >
        <div className="h-screen"><Section1 /></div>
        <div className="h-screen"><Section2 /></div>
        <div className="h-screen"><Section3 /></div>
      </div>
    </div>
  );
};

export default MainContent;
