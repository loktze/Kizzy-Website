// src/components/PhonePortal.tsx
import { createPortal } from 'react-dom';
import { motion, useAnimation, Variants, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useScroll } from '../hooks/useScroll';
import useMediaQuery from '../hooks/useMediaQuery';

const PhonePortal = () => {
  const { currentSection, phoneHide } = useScroll();
  const controls = useAnimation();
  const videoControls = useAnimation();
  const [mounted, setMounted] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  // Media Queries
  const isMdOrLarger = useMediaQuery('(min-width: 768px)');
  const isLgOrLarger = useMediaQuery('(min-width: 1024px)');
  const isXlOrLarger = useMediaQuery('(min-width: 1280px)');

  // Responsive Dimensions
  const phoneWidth = isXlOrLarger ? 377 : 227; // 377px for xl+, 227px otherwise
  const phoneHeight = isXlOrLarger ? 775 : 466; // 775px for xl+, 466px otherwise

  const SLIDE_DISTANCE = 200;

  const PHONE2_WIDTH_LG = 570;
  const PHONE2_HEIGHT_LG = 461;
  const PHONE2_WIDTH_SM = 298;
  const PHONE2_HEIGHT_SM = 241;

  // Video Styles - Adjust borderRadius based on screen size
  const VIDEO_STYLES = useMemo(() => ({
    width: phoneWidth * 0.99,
    height: phoneHeight * 0.98,
    borderRadius: isXlOrLarger ? '65px' : '40px', // 80px for xl+, 40px for smaller
  }), [phoneWidth, phoneHeight, isXlOrLarger]);

  // Determine the width and height of phone2.png based on screen size
  const phone2Width = isLgOrLarger ? PHONE2_WIDTH_LG : PHONE2_WIDTH_SM;
  const phone2Height = isLgOrLarger ? PHONE2_HEIGHT_LG : PHONE2_HEIGHT_SM;

  // Track previous section to determine scroll direction
  const previousSectionRef = useRef(currentSection);

  useEffect(() => {
    previousSectionRef.current = currentSection;
  }, [currentSection]);

  const isScrollingForward = currentSection > previousSectionRef.current;

  // Define variants for phone.png
  const phoneVariants: Variants = useMemo(
    () => ({
      default: {
        y: 0,
        scale: 1, // Ensure no scaling by default
        opacity: 1,
        transition: {
          duration: 1,
          ease: [0.43, 0.13, 0.23, 0.96],
        },
      },
      section0: {
        y: 0,
        scale: 1, // No scaling
        opacity: 1,
        transition: {
          duration: 1,
          ease: [0.43, 0.13, 0.23, 0.96],
        },
      },
      section1: {
        y: isMdOrLarger ? 300 : 250, // Slide down by 300px or 250px based on screen size
        scale: isMdOrLarger ? 1.2 : 1.5, // Adjust scaling based on screen size
        opacity: 1,
        transition: {
          duration: 1,
          ease: [0.43, 0.13, 0.23, 0.96],
        },
      },
      section2: {
        y: SLIDE_DISTANCE - 50, // Maintain existing logic
        scale: isMdOrLarger ? 1.2 : 0.8, // Adjust scaling based on screen size
        opacity: isMdOrLarger ? 1 : 0.5,
        transition: {
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96],
        },
      },
      section3: {
        y: SLIDE_DISTANCE + 50, // Maintain existing logic
        scale: 0,
        opacity: 0,
        transition: {
          duration: 0.5,
          ease: [0.43, 0.13, 0.23, 0.96],
        },
      },
      phoneHide: {
        scale: isMdOrLarger ? 1.2 : 1.4, // Adjust scaling based on screen size
        opacity: isMdOrLarger ? 1 : 0.2, // Adjust opacity based on screen size
        transition: {
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96],
        },
      },
    }),
    [SLIDE_DISTANCE, isMdOrLarger]
  );

  // Define variants for phone2.png with top-to-bottom reveal effect
  const phone2Variants: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        clipPath: 'inset(0% 0% 100% 0%)', // Start with the image fully covered from the bottom
      },
      visible: {
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0%)', // Reveal the image completely
        transition: {
          duration: shouldReduceMotion ? 0 : 4, // Increased duration for a slower animation
          delay: shouldReduceMotion ? 0 : 0.5, // Slight delay before the animation starts
          ease: [0.42, 0, 0.58, 1], // Smooth easeInOut easing
        },
      },
      exit: (isScrollingForward: boolean) => ({
        opacity: 0,
        clipPath: 'inset(0% 0% 100% 0%)', // Contract the image back to hidden from the bottom
        transition: {
          duration: isScrollingForward
            ? shouldReduceMotion
              ? 0
              : 2 // Slower exit animation when scrolling forward
            : 0, // Instant exit if not scrolling forward
          ease: isScrollingForward ? [0.42, 0, 0.58, 1] : undefined, // Smooth easing when exiting
        },
      }),
    }),
    [shouldReduceMotion]
  );

  // Video fade animation
  useEffect(() => {
    if (currentSection === 0) {
      videoControls.start({
        opacity: 1,
        transition: { duration: 0.8 },
      });
    } else {
      videoControls.start({
        opacity: 0,
        transition: { duration: 0.8 },
      });
    }
  }, [currentSection, videoControls]);

  // Set mounted to true on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update phone.png animation based on currentSection and phoneHide
  useEffect(() => {
    let variant = 'default';

    if (currentSection === 0) {
      variant = 'section0';
    } else if (currentSection === 1) {
      if (isMdOrLarger) {
        variant = 'section1'; // Trigger scale and slide down on md+ devices
      } else {
        variant = phoneHide ? 'phoneHide' : 'section1';
      }
    } else if (currentSection === 2) {
      variant = 'section3'; // Fully hide phone.png in Section3
    }

    console.log(`Applying variant: ${variant}`); // Debugging log
    controls.start(phoneVariants[variant]);
  }, [currentSection, phoneHide, controls, phoneVariants, isMdOrLarger]);

  // Debugging log to confirm currentSection
  useEffect(() => {
    console.log('PhonePortal - Current Section:', currentSection);
  }, [currentSection]);

  // Determine if the portal should be rendered
  const shouldRenderPortal = mounted && currentSection < 3; // 0,1,2

  const content = (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1000 }}
    >
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        {/* phone.png and video */}
        <motion.div
          initial="default" // Set initial variant to default
          animate={controls}
          variants={phoneVariants}
          style={{ originX: 0.5, originY: 0.5 }} // Ensure centered transform origin
          className="relative"
        >
          <div className="relative">
            <img
              src="/images/phone.png"
              alt="Phone"
              width={phoneWidth}
              height={phoneHeight}
              className="object-contain"
            />
            <motion.div
              initial={{ opacity: 1 }}
              animate={videoControls}
              className="absolute"
              style={{
                top: '1.1%',
                left: '0.2%',
                width: VIDEO_STYLES.width,
                height: VIDEO_STYLES.height,
                borderRadius: VIDEO_STYLES.borderRadius,
                overflow: 'hidden',
                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                maskImage: 'radial-gradient(white, black)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: VIDEO_STYLES.borderRadius,
                  overflow: 'hidden',
                }}
              >
                <iframe
                  src="https://player.vimeo.com/video/1033441094?badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&quality=1080p&dnt=1"
                  width="100%"
                  height="100%"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(1.01)',
                    borderRadius: VIDEO_STYLES.borderRadius,
                  }}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  loading="eager"
                  title="Animation"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* AnimatePresence for phone2.png */}
        <AnimatePresence>
          {currentSection === 2 && (
            <motion.div
              key="phone2"
              variants={phone2Variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={isScrollingForward} // Pass scroll direction for exit animation
              className="absolute top-1/4 xl:top-[20%] left-0 w-full h-full flex justify-center items-center pb-[150px]" // Added pb-[150px]
              style={{ zIndex: 1100, transformOrigin: 'center' }} // Ensure scaling from center
            >
              <img
                src="/images/phone2.png"
                alt="Phone 2"
                width={phone2Width}
                height={phone2Height}
                className="object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (!mounted) {
    return null;
  }

  if (typeof window !== 'undefined' && shouldRenderPortal) {
    return createPortal(content, document.body);
  }

  return null;
};

export default PhonePortal;
