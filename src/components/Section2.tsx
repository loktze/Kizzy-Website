'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useScroll } from '../hooks/useScroll';
import FirstTopCard from './cards/FirstTopCard';
import FirstBottomCard from './cards/FirstBottomCard';
import SecondTopCard from './cards/SecondTopCard';
import SecondBottomCard from './cards/SecondBottomCard';
import Portal from './Portal';
import useMediaQuery from '../hooks/useMediaQuery';
import { Link } from 'react-router-dom';

const Section2: React.FC = () => {
  const WHEEL_THRESHOLD = 30;
  const TOUCH_THRESHOLD = 50;

  // Initialize animationStep to null (no cards visible)
  const [animationStep, setAnimationStep] = useState<number | null>(null); // null: No cards, 1: Step1, 2: Step2

  // Initialize animationDirection to 'down'
  const [animationDirection, setAnimationDirection] = useState<'up' | 'down'>('down');

  const {
    currentSection,
    setCurrentSection,
    setPreventScroll,
    setPhoneHide,
  } = useScroll();

  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const wheelAccumulator = useRef(0);

  // State to determine if animations should be triggered (only for transitions to/from Section1 on lg+ devices)
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);

  // State to control text visibility
  const [isTextVisible, setIsTextVisible] = useState<boolean>(false);

  // Track previous section to detect transitions
  const prevSection = useRef<number>(currentSection);

  // Animation variants for lg+ devices: Cards
  const lgCardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay },
    }),
    exit: { opacity: 0, y: 50, transition: { duration: 0.8, ease: 'easeIn' } },
  };

  // Define animation variants for the new text
  const textVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.8, ease: 'easeIn' }
    },
  };

  // Detect reduced motion preference
  const shouldReduceMotion = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    shouldReduceMotion.current = mediaQuery.matches;

    const handleChange = () => {
      shouldReduceMotion.current = mediaQuery.matches;
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Detect if device is lg or larger
  const isLgOrLarger = useMediaQuery('(min-width: 1024px)');

  // New state to track if lg+ animations have been triggered
  const [hasLgAnimated, setHasLgAnimated] = useState(false);

  // Trigger lg+ animations when entering Section2
  useEffect(() => {
    if (currentSection === 1 && isLgOrLarger && !hasLgAnimated) {
      setHasLgAnimated(true);
      setPhoneHide(true); // Trigger PhonePortal animation if needed
    }
  }, [currentSection, isLgOrLarger, hasLgAnimated, setPhoneHide]);

  // **Updated useEffect to handle text animation on entering Section2 for md devices**
  useEffect(() => {
    if (currentSection === 1) { // Entering Section2
      if (isLgOrLarger) {
        // For lg+ devices, show text immediately without animation delays
        setIsTextVisible(true);
      } else {
        // For md devices (previously sm), show text with animation
        console.log('Entering Section2 on md device: Ensuring text is visible');
        setIsTextVisible(true); // Show text
        setIsAnimating(true); // Prevent other scroll actions during animation

        // After text animation completes, allow scrolling
        setTimeout(() => {
          setIsAnimating(false);
        }, 1500); // Match the text animation duration
      }
    }
    // Update previous section
    prevSection.current = currentSection;
  }, [currentSection, isLgOrLarger]);

  // Reset animations only when leaving Section2
  useEffect(() => {
    if (currentSection !== 1) { // Assuming Section2 has index 1
      setAnimationStep(null); // Reset animations when leaving Section2
      setHasLgAnimated(false); // Reset lg+ animation trigger
      setShouldAnimate(false); // Reset animation flag
      setPhoneHide(false);
      setIsTextVisible(false); // Hide text
    }
    // No action needed when entering Section2
  }, [currentSection, setPhoneHide]);

  // Prevent scrolling when in Section2
  useEffect(() => {
    if (currentSection === 1) { // Section2 index
      setPreventScroll(true);
    } else {
      setPreventScroll(false);
    }
  }, [currentSection, setPreventScroll]);

  // Debugging: Log animation steps and current section
  useEffect(() => {
    console.log('Current Section:', currentSection);
    console.log('Animation Step:', animationStep);
    console.log('Animation Direction:', animationDirection);
    console.log('Should Animate:', shouldAnimate);
    console.log('Is Text Visible:', isTextVisible);
  }, [currentSection, animationStep, animationDirection, shouldAnimate, isTextVisible]);

  // Handle scroll and touch actions
  const handleScrollAction = useCallback(
    (direction: 'up' | 'down') => {
      if (isAnimating) {
        console.log('Currently animating. Scroll action ignored.');
        return;
      }

      setIsAnimating(true);

      const now = Date.now();
      if (now - lastScrollTime.current < 800) {
        console.log('Scroll action debounced.');
        return; // Debounce to match animation duration
      }
      lastScrollTime.current = now;

      console.log(`Handling scroll ${direction}`);


      setAnimationDirection(direction); // Set the direction

      if (direction === 'down') {
        if (currentSection === 1) { // Section2
          if (isLgOrLarger) {
            // For lg+ devices, transition directly to Section3 without animations
            console.log('Scroll Down: Transitioning to Section3 (lg+)');
            setPreventScroll(false);
            setCurrentSection(2); // Assuming Section3 is index 2

            setTimeout(() => {
              setIsAnimating(false);
            }, 800);
          } else {
            // For md devices (previously sm)
            if (animationStep === null) {
              console.log('Scroll Down: Starting Animation Step 1 (md)');
              setAnimationStep(1); // Start Step1
              setPhoneHide(true);   // Trigger PhonePortal to hide
              setIsAnimating(false);
            } else if (animationStep === 1) {
              console.log('Scroll Down: Starting Animation Step 2 (md)');
              setAnimationStep(2); // Start Step2
              setIsAnimating(false);
            } else if (animationStep === 2) {
              console.log('Scroll Down: Transitioning to Section3 (md)');
              setPreventScroll(false);
              setCurrentSection(2); // Assuming Section3 is index 2
              setIsAnimating(false);
            }
          }
        }
      } else if (direction === 'up') {
        if (currentSection === 2) { // From Section3 to Section2
          console.log('Scroll Up: Transitioning from Section3 to Section2');
          setCurrentSection(1);
          if (isLgOrLarger) {
            // No animations when transitioning from Section3 to Section2
            setHasLgAnimated(false); // Reset lg+ animation trigger
          } else {
            setAnimationStep(2); // Show Step2 for md
            setIsTextVisible(true); // Ensure text remains visible
            setPhoneHide(false);    // Ensure PhonePortal is visible
          }

          setTimeout(() => {
            setIsAnimating(false);
          }, 800);
        } else if (currentSection === 1) {
          if (isLgOrLarger) {
            // For lg+ devices, allow scrolling up to Section1 with exit animations
            console.log('Scroll Up: Transitioning to Section1 (lg+) with exit animations');
            setShouldAnimate(true); // Trigger exit animations
            setCurrentSection(0); // Assuming Section1 is index 0
            setPreventScroll(false);
            setPhoneHide(false);

            setTimeout(() => {
              setIsAnimating(false);
              setShouldAnimate(false); // Reset after animation
            }, 800);
          } else {
            // **Handle scroll up when in Section2 (md devices)**
            if (currentSection === 1 && !isLgOrLarger) {
              console.log('Scroll Up: Transitioning to Section1 (md)');
              setIsTextVisible(false); // Hide text
              setIsAnimating(true); // Prevent other scroll actions

              // After text fade-out animation completes, transition to Section1
              setTimeout(() => {
                setCurrentSection(0); // Transition to Section1
                setIsAnimating(false);
              }, 800); // Match the exit animation duration
            }
          }
        }
      }
    },
    [
      currentSection,
      isAnimating,
      animationStep,
      setCurrentSection,
      setPreventScroll,
      setPhoneHide,
      setAnimationDirection,
      isLgOrLarger,
    ] // Updated dependencies
  );

  // Wheel event listener
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (currentSection !== 1 && currentSection !== 2) return;
      e.preventDefault();

      wheelAccumulator.current += e.deltaY;

      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }

      wheelTimeout = setTimeout(() => {
        if (Math.abs(wheelAccumulator.current) > WHEEL_THRESHOLD) {
          handleScrollAction(wheelAccumulator.current > 0 ? 'down' : 'up');
        }
        wheelAccumulator.current = 0;
      }, 100);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }
    };
  }, [currentSection, handleScrollAction]);

  // Touch event listeners
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (currentSection !== 1 && currentSection !== 2) return;
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (currentSection !== 1 && currentSection !== 2) return;

      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > TOUCH_THRESHOLD) {
        handleScrollAction(deltaY > 0 ? 'down' : 'up');
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, handleScrollAction]);

  return (
    <div
      className="h-screen flex flex-col items-center relative overflow-hidden bg-cover bg-center bg-white z-50"
      style={{ backgroundImage: 'url(/images/bg.png)' }}
    >

      {/* Header */}
      {currentSection === 1 && (
        <header className="absolute top-0 w-full bg-transparent z-20">
          <div className="flex justify-between mt-6 items-center p-4 lg:p-10">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                {/* Mobile Logo: Visible on lg and smaller devices */}
                <img
                  src="/images/kizzy-logo-dark-mobile.png"
                  alt="Logo"
                  width={69}
                  height={28}
                  className="block lg:hidden"
                  loading="lazy" // Optional: enables native lazy loading
                />
                {/* Desktop Logo: Visible on larger than lg devices */}
                <img
                  src="/images/kizzy-dark-logo.png"
                  alt="Logo"
                  width={142}
                  height={58}
                  className="hidden lg:block"
                  loading="lazy" // Optional: enables native lazy loading
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-14">
              <div
                className={`hidden md:block font-lexend font-semibold text-sm text-black leading-[21px] tracking-[-0.154px]`}
              >
                <Link to="/careers">Careers</Link>
              </div>
              {/* Download Button */}
              <div
                className="group relative flex items-center gap-2 rounded-lg py-3 px-4 2xl:py-3 2xl:px-6 overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(90deg, #7040DB 0%, #906BE6 45.03%, #6E40DB 100%)',
                }}
              >
                {/* Overlay for Hover Effect */}
                <div
                  className="absolute inset-0 rounded-lg transition-opacity duration-300 opacity-0 bg-gradient-to-r from-[#906BE6] via-[#7040DB] to-[#906BE6] group-hover:opacity-100"
                ></div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="white"
                  className="w-5 z-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                <Link to="/" className="font-lexend text-white text-xs 2xl:text-base font-medium">
                  Download now
                </Link>
              </div>
            </div>
          </div>
        </header>
      )}

      <AnimatePresence mode="wait">
        {/* Text Animations */}
        {isTextVisible && (
          <motion.div
            key="text-enter"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textVariants}
            className={`absolute mt-32 2xl:mt-40 text-center w-full px-4`}
          >
            <h2 className={`font-poppins font-semibold mb-2 ${isLgOrLarger ? 'text-7xl text-[#0E1727] font-medium' : 'text-2xl text-[#0E1727] font-medium'}`}>
              Betting Like Never Before
            </h2>
            <p className={`font-lexend text-xs text-[#666666] mt-4 leading-[18px] tracking-[-0.132px] lg:text-[16px] lg:mt-11 lg:leading-[24px] lg:tracking-[-0.176px] ${isLgOrLarger ? 'text-lg' : ''}`}>
              Social media creators have taken over the world.<br className="lg:hidden" />
              Why not bet on them?<br />
              Kizzy is the world’s first social media betting app.
            </p>
            <div
              className={`md:hidden inline-flex items-center gap-2 rounded-lg py-3 px-4 2xl:py-4 2xl:px-6 bg-gradient-to-r from-[#7040DB] via-[#906BE6] to-[#6E40DB] mt-5 lg:mt-11 mx-auto`}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Portal>
        <AnimatePresence mode="wait">
          {isLgOrLarger ? (
            <>

              {!shouldAnimate && hasLgAnimated && currentSection === 1 && (
                // Entering Section2 from Section1 or Section3
                <>
                  {/* --- Entry Animation for First Card Set (Left) --- */}
                  <motion.div
                    key="lg-cards-enter-first-set"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={lgCardVariants}
                    className="absolute bottom-4 lg:left-10 xl:left-[100px] 2xl:left-[240px] flex flex-col space-y-4"
                  >
                    {/* FirstTopCard */}
                    <FirstTopCard
                      customDelay={1.1} // Starts after 0.4s
                      className="bg-[#F5F5F5] rounded-[20px] p-4"
                    />
                    {/* FirstBottomCard */}
                    <FirstBottomCard
                      customDelay={0.5} // Starts immediately
                      className="bg-[#fff] rounded-[18px] p-5"
                    />
                  </motion.div>

                  {/* --- Entry Animation for Second Card Set (Right) --- */}
                  <motion.div
                    key="lg-cards-enter-second-set"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={lgCardVariants}
                    className="absolute bottom-4 lg:right-10 xl:right-[100px] 2xl:right-[240px] flex flex-col space-y-4"
                  >
                    {/* SecondTopCard */}
                    <SecondTopCard
                      customDelay={1.3} // Starts after 0.6s
                      className="bg-[#F5F5F5] rounded-tl-3xl rounded-b-3xl"
                    />
                    {/* SecondBottomCard */}
                    <SecondBottomCard
                      customDelay={0.7} // Starts after 0.2s
                      className="bg-[#fff] rounded-[18px] p-4"
                    />
                  </motion.div>
                </>
              )}
            </>
          ) : (
            // Medium Devices (md) Rendering (previously sm devices)
            <>
              {/* Step1 for medium devices */}
              <AnimatePresence>
                {animationStep === 1 && (
                  <motion.div
                    key="step1-md"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 } },
                      exit: { opacity: 0, x: -50, transition: { duration: 0.8, ease: 'easeIn' } },
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col space-y-4 pointer-events-auto items-center absolute inset-0 justify-end pb-10"
                  >
                    {/* FirstTopCard */}
                    <FirstTopCard
                      customDelay={0}
                      className="bg-[#F5F5F5] rounded-[20px] p-7"
                    />
                    {/* FirstBottomCard */}
                    <FirstBottomCard
                      customDelay={0}
                      className="bg-[#fff] rounded-[18px] p-[20px]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step2 for medium devices */}
              <AnimatePresence>
                {animationStep === 2 && (
                  <motion.div
                    key="step2-md"
                    variants={{
                      hidden: { opacity: 0, x: 50 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 } },
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col space-y-4 pointer-events-auto items-center absolute inset-0 justify-end pb-10"
                  >
                    {/* SecondTopCard */}
                    <SecondTopCard
                      customDelay={0}
                      className="bg-[#F5F5F5] rounded-tl-3xl rounded-b-3xl"
                    />
                    {/* SecondBottomCard */}
                    <SecondBottomCard
                      customDelay={0}
                      className="bg-[#fff] rounded-[18px]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
};

export default Section2;
