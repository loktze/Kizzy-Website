'use client';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScroll } from '../hooks/useScroll';
import { useEffect } from 'react';

const Section1: React.FC = () => {
  const { currentSection, isAnimating } = useScroll();

  useEffect(() => {
    console.log(`Section1 - Current Section: ${currentSection}, IsAnimating: ${isAnimating}`);
  }, [currentSection, isAnimating]);

  return (
    <section className="h-screen relative bg-white overflow-hidden">
      <header className="absolute top-0 w-full bg-transparent z-20">
        <div className="flex justify-between mt-6 items-center p-4 md:p-10">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/images/kizzy-logo-dark-mobile.png"
                alt="Logo"
                width={69}
                height={28}
                className="block md:hidden"
                loading="lazy" // Optional: enables native lazy loading
              />
              <img
                src="/images/kizzy-dark-logo.png"
                alt="Logo"
                width={142}
                height={58}
                className="hidden md:block"
                loading="lazy"
              />
            </Link>
          </div>
          <div className="flex items-center gap-14">
            <div
              className={`hidden md:block font-lexend font-semibold text-sm text-black leading-[21px] tracking-[-0.154px]`}
            >
              <Link to="/careers">Careers</Link>
            </div>
            <div
              className="group relative flex items-center gap-2 rounded-lg py-3 px-4 2xl:py-3 2xl:px-6 overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(90deg, #7040DB 0%, #906BE6 45.03%, #6E40DB 100%)',
              }}
            >
              <div
                className="absolute inset-0 rounded-lg transition-opacity duration-300 opacity-0 bg-gradient-to-r from-[#906BE6] via-[#7040DB] to-[#906BE6] group-hover:opacity-100"
              ></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="white"
                className="w-[17px] z-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <Link to="/" className="text-white text-xs 2xl:text-base font-lexend font-medium">
                Download now
              </Link>
            </div>
          </div>
        </div>
      </header>
      <img
        src="/images/bg.png"
        alt="Background"
        className="object-cover w-full h-auto"
        loading="lazy"
      />

      <motion.div
        animate={{ opacity: isAnimating ? 0 : 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-full h-full z-10 sm:hidden"
      >
        <img
          src="/images/hand-mobile.png"
          alt="Hand Mobile"
          width={395}
          height={742}
          className="object-cover"
          loading="lazy"
        />
      </motion.div>

      <div className="absolute inset-0 flex justify-center items-center z-5 pt-[100px] md:pt-0 h-full">
        <div
          className="absolute w-[80%] h-[700px] blur-[80px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(204, 196, 245, 0.6) 0%, rgba(204, 196, 245, 0.3) 70%, rgba(204, 196, 245, 0) 100%)', // Darker purple
          }}
        />
        <div
          className="absolute w-[60%] h-[500px] blur-[80px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(204, 196, 245, 0.7) 0%, rgba(204, 196, 245, 0.35) 60%, rgba(204, 196, 245, 0) 100%)', // Darker purple
          }}
        />
        <div className="absolute w-full flex justify-center z-0 pt-[500px] md:pt-0">
          <div className="w-full whitespace-nowrap overflow-hidden">
            <motion.div
              animate={{ x: ['0%', '-100%'] }}
              transition={{
                repeat: Infinity,
                duration: 35,
                ease: 'linear',
              }}
              className="inline-block text-white font-poppins font-semibold whitespace-nowrap text-[100px] md:text-[300px] shadow-md"
              aria-hidden="true"
            >
              Social Media Betting Social Media Betting Social Media Betting Social Media Betting
            </motion.div>
          </div>
        </div>

        <div className="hidden xl:flex absolute inset-0 justify-center left-[277px] top-10 items-center z-30">
          <img
            src="/images/hand.png"
            alt="Hand"
            width={1065}
            height={1231}
            className="object-contain"
            loading="lazy"
          />
        </div>
      </div>

      <footer className="absolute bottom-0 w-full bg-transparent z-20">
        <div className="hidden md:flex justify-end p-12">
          <Link to="/privacy-policy">
            <p className="font-lexend text-sm font-medium text-[#999] tracking-[-0.154px] cursor-pointer">Privacy Policy</p>
          </Link>
        </div>
        <div className="bg-white flex justify-center md:hidden">
          <div className="flex gap-4 pb-[24px]">
            <Link to="/privacy-policy">
              <p className="font-lexend text-sm font-medium text-[#999] tracking-[-0.154px] cursor-pointer">Privacy Policy</p>
            </Link>
            <Link to="/careers">
              <p className="font-lexend text-sm font-medium text-[#999] tracking-[-0.154px] cursor-pointer">Careers</p>
            </Link>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Section1;
