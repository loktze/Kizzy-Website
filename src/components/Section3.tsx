'use client';

import { motion, Variants, useReducedMotion } from 'framer-motion';
import { useScroll } from '../hooks/useScroll';
import useMediaQuery from '../hooks/useMediaQuery';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Section3: React.FC = () => {
  const { currentSection } = useScroll();
  const isLgOrLarger = useMediaQuery('(min-width: 1024px)');
  const isXlOrLarger = useMediaQuery('(min-width: 1280px)');
  const shouldReduceMotion = useReducedMotion();
  const isTextVisible = currentSection === 2;
  const leftTopScale = isXlOrLarger ? 1 : isLgOrLarger ? 0.7 : 1;
  const leftBottomScale = isXlOrLarger ? 1 : isLgOrLarger ? 0.7 : 1;
  const rightCenterScale = isXlOrLarger ? 1 : isLgOrLarger ? 0.7 : 1;

  const headingVariants: Variants = shouldReduceMotion
    ? {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    }
    : {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: 'easeOut', delay: 1 },
      },
    };

  const paragraphVariants: Variants = shouldReduceMotion
    ? {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    }
    : {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: 'easeOut', delay: 1.5 },
      },
    };

  const leftTopVariants: Variants = shouldReduceMotion
    ? {
      hidden: { opacity: 1, scale: leftTopScale },
      visible: { opacity: 1, scale: leftTopScale },
    }
    : {
      hidden: {
        opacity: 0,
        scale: leftTopScale < 1 ? leftTopScale * 0.8 : 0.8,
        x: 50,
      },
      visible: {
        opacity: 1,
        scale: leftTopScale,
        x: 0,
        transition: { duration: 1, ease: 'easeOut', delay: 1.2 },
      },
    };

  const leftBottomVariants: Variants = shouldReduceMotion
    ? {
      hidden: { opacity: 1, scale: leftBottomScale },
      visible: { opacity: 1, scale: leftBottomScale },
    }
    : {
      hidden: {
        opacity: 0,
        scale: leftBottomScale < 1 ? leftBottomScale * 0.8 : 0.8,
        x: 50,
      },
      visible: {
        opacity: 1,
        scale: leftBottomScale,
        x: 0,
        transition: { duration: 1, ease: 'easeOut', delay: 1.3 },
      },
    };

  const rightCenterVariants: Variants = shouldReduceMotion
    ? {
      hidden: { opacity: 1, scale: rightCenterScale },
      visible: { opacity: 1, scale: rightCenterScale },
    }
    : {
      hidden: {
        opacity: 0,
        scale: rightCenterScale < 1 ? rightCenterScale * 0.8 : 0.8,
        x: -50,
      },
      visible: {
        opacity: 1,
        scale: rightCenterScale,
        x: 0,
        transition: { duration: 1, ease: 'easeOut', delay: 1.4 },
      },
    };

  useEffect(() => {
    console.log(`Section3 - isTextVisible: ${isTextVisible}`);
  }, [isTextVisible]);

  return (
    <section
      id="section3"
      className="h-screen flex flex-col bg-[#110c2f] text-white text-center relative overflow-hidden"
    >
      {isTextVisible && (
        <header className="absolute top-0 w-full bg-transparent z-50">
          <div className="flex justify-between mt-6 items-center p-4 md:p-10">
            <div className="flex items-center">
              <Link to="/">
                <img
                  src="/images/kizzy-logo-light-mobile.png"
                  alt="Logo"
                  width={69}
                  height={28}
                  className="md:hidden"
                  loading="lazy"
                />
                <img
                  src="/images/kizzy-light-logo.png"
                  alt="Logo"
                  width={142}
                  height={58}
                  className="hidden md:block"
                  loading="lazy"
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-14">
              <div
                className={`font-lexend text-white font-semibold text-sm leading-[21px] tracking-[-0.154px]`}
              >
                <p>Careers</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg py-3 px-4 2xl:py-3 2xl:px-6 bg-gradient-to-r from-[#7040DB] via-[#906BE6] to-[#6E40DB]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="white"
                  className="w-[17px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                <Link to="/" className="text-white text-xs 2xl:text-base font-lexend font-medium">
                  Download Now
                </Link>
              </div>
            </div>
          </div>
        </header>
      )}

      {isTextVisible && (
        <div
          className={`w-full px-4 ${isLgOrLarger ? '' : 'mt-20'}`}
        >
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={headingVariants}
            className="relative mt-10 md:mt-32 font-poppins text-[30px] md:text-[70px] font-medium mb-4 leading-[27px] md:leading-[63px] tracking-[-0.66px] text-center"
          >
            Start Social Media
            <br />
            Betting Now
            {/* <img
              src="/images/text-decoration.png"
              alt="Text Decoration"
              width={136}
              height={51}
              className="absolute left-14 -top-7 z-0"
              loading="lazy"
            /> */}
          </motion.h2>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={paragraphVariants}
            className={`font-lexend text-[#B2B2B2] text-center ${isLgOrLarger ? 'text-[16px] leading-[24px] tracking-[-0.176px] mt-11' : 'text-[12px] leading-[18px] tracking-[-0.132px] mt-6'
              }`}
          >
            {isLgOrLarger ? (
              <>
                Social media creators have taken over the world. Why not bet on them?
                <br />
                Kizzy is the world’s 1st social media betting app.
              </>
            ) : (
              <>
                Social media creators have taken over the world.
                <br />
                Why not bet on them?
                <br />
                Kizzy is the world’s 1st social media betting app.
              </>
            )}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={
              shouldReduceMotion
                ? {
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 1, delay: 2 } },
                }
                : {
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut', delay: 2 } },
                }
            }
            className={`inline-flex items-center gap-2 rounded-lg py-3 px-4 2xl:py-4 2xl:px-6 bg-gradient-to-r from-[#7040DB] via-[#906BE6] to-[#6E40DB] mt-[25px] lg:mt-[43px] mx-auto`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="white"
              className="w-[17px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <Link to="/" className="text-white text-xs 2xl:text-base font-lexend font-medium">
              Download Now
            </Link>
          </motion.div>
        </div>
      )}

      {isXlOrLarger && isTextVisible && (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={leftTopVariants}
            className="absolute left-1 top-1/4 xl:left-5 xl:top-[15%] 2xl:left-[150px]"
          >
            <img
              src="/images/left-top-image.png"
              alt="Left Top"
              width={352}
              height={352}
              className="object-contain"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={leftBottomVariants}
            className="absolute left-1 bottom-1/4 xl:left-1 xl:bottom-[15%] 2xl:left-[120px]"
          >
            <img
              src="/images/left-bot-image.png"
              alt="Left Bottom"
              width={277}
              height={277}
              className="object-contain"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={rightCenterVariants}
            className="absolute right-2.5 top-[25%] xl:right-1 xl:top-[25%] 2xl:right-[150px]"
          >
            <img
              src="/images/right-image.png"
              alt="Right"
              width={409}
              height={409}
              className="object-contain"
            />
          </motion.div>
        </>
      )}

      {isTextVisible && (
        <footer className="absolute bottom-0 w-full bg-transparent">
          <div className="flex justify-center md:hidden">
            <div className="font-lexend flex gap-4 pb-8 text-white text-sm">
              <p>&copy; Kizzy Labs</p>
              <p>Privacy Policy</p>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="font-lexend flex gap-4 pb-8 text-white text-sm leading-[21px] tracking-[-0.154px]">
              <p>Career</p>
              <p>&copy; Kizzy Labs</p>
              <p>Privacy Policy</p>
            </div>
          </div>
        </footer>
      )}
    </section>
  );
};

export default Section3;
