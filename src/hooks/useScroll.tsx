// src/hooks/useScroll.ts
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ScrollContextType {
  currentSection: number;
  setCurrentSection: (section: number) => void;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
  preventScroll: boolean;
  setPreventScroll: (value: boolean) => void;
  scrollDirection: 'up' | 'down' | null;
  setScrollDirection: (direction: 'up' | 'down' | null) => void;
  phoneHide: boolean;
  setPhoneHide: (value: boolean) => void;
  previousSection: number;
  setPreviousSection: (section: number) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  currentSection: 0,
  setCurrentSection: () => { },
  isAnimating: false,
  setIsAnimating: () => { },
  preventScroll: false,
  setPreventScroll: () => { },
  scrollDirection: null,
  setScrollDirection: () => { },
  phoneHide: false,
  setPhoneHide: () => { },
  previousSection: 0,
  setPreviousSection: () => { },
});

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [currentSection, setCurrentSectionState] = useState(0);
  const [previousSection, setPreviousSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [preventScroll, setPreventScroll] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [phoneHide, setPhoneHide] = useState(false);

  // Update previousSection whenever currentSection changes
  const setCurrentSection = (section: number) => {
    setPreviousSection(currentSection);
    setCurrentSectionState(section);
  };

  // Lock body scroll when preventScroll is true
  useEffect(() => {
    if (preventScroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [preventScroll]);

  return (
    <ScrollContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        isAnimating,
        setIsAnimating,
        preventScroll,
        setPreventScroll,
        scrollDirection,
        setScrollDirection,
        phoneHide,
        setPhoneHide,
        previousSection,
        setPreviousSection,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
