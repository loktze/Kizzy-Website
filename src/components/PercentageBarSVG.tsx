// src/components/PercentageBarSVG.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface PercentageBarSVGProps {
  numberLeft: string;      // Left number for the purple segment (e.g., "124,991")
  percentageLeft: number;  // Percentage for the purple segment (e.g., 60)
  numberRight: string;     // Right number for the blue segment (e.g., "932,32")
  percentageRight: number; // Percentage for the blue segment (e.g., 40)
}

const PercentageBarSVG: React.FC<PercentageBarSVGProps> = ({
  numberLeft,
  percentageLeft,
  numberRight,
  percentageRight,
}) => {
  // Normalize percentages to ensure they sum to 100
  const totalPercentage = percentageLeft + percentageRight;
  const normalizedPercentageLeft = totalPercentage !== 100 ? (percentageLeft / totalPercentage) * 100 : percentageLeft;
  const normalizedPercentageRight = totalPercentage !== 100 ? (percentageRight / totalPercentage) * 100 : percentageRight;

  // Determine which segment has a larger percentage
  const isLeftLarger = normalizedPercentageLeft > normalizedPercentageRight;

  // Scaling factors (Set to 1 initially to prevent overlapping)
  const scaleLeft = isLeftLarger ? 1.05 : 1;
  const scaleRight = !isLeftLarger ? 1.05 : 1;

  return (
    <div
      className="grid items-center rounded-full overflow-hidden"
      style={{
        gridTemplateColumns: `calc(${normalizedPercentageLeft}% - 2.5px) 5px calc(${normalizedPercentageRight}% - 2.5px)`,
        height: '64px', // Ensure both SVGs are the same height
        width: '100%',
      }}
    >
      {/* Purple Segment */}
      <motion.div
        className="relative"
        animate={{ scale: scaleLeft }}
        transition={{ duration: 0.3 }}
        aria-label={`${numberLeft} with ${normalizedPercentageLeft}%`}
        style={{ transformOrigin: 'center left' }} // Scale from left
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 178 47"
          fill="none"
          className="h-full w-full"
        >
          <path
            d="M0 23.5C0 10.5213 10.5213 0 23.5 0H169.403C175.721 0 179.545 6.97898 176.146 12.3043L156.359 43.3043C154.889 45.6066 152.347 47 149.616 47H23.5C10.5213 47 0 36.4787 0 23.5Z"
            fill="#8663FF"
          />
        </svg>
        {/* Text Label */}
        <div className="absolute inset-0 flex items-center justify-around text-white text-sm">
          <span className="font-bold">{numberLeft}</span>
          <span className="font-normal">{normalizedPercentageLeft}%</span>
        </div>
      </motion.div>

      {/* Gap */}
      <div className="w-[0.1px] h-full bg-white"></div>

      {/* Blue Segment */}
      <motion.div
        className="relative"
        animate={{ scale: scaleRight }}
        transition={{ duration: 0.3 }}
        aria-label={`${numberRight} with ${normalizedPercentageRight}%`}
        style={{ transformOrigin: 'center right' }} // Scale from right
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 143 47" // Adjusted height to match purple SVG
          fill="none"
          className="h-full w-full"
        >
          <path
            d="M143 21.3637C143 33.1625 133.435 42.7273 121.636 42.7273H8.27016C2.52681 42.7273 -0.950302 36.3828 2.13982 31.5416L20.1282 3.35977C21.4641 1.2668 23.7756 2.28882e-05 26.2585 2.28882e-05H121.636C133.435 2.28882e-05 143 9.56485 143 21.3637Z"
            fill="#278BFF"
          />
        </svg>
        {/* Text Label */}
        <div className="absolute inset-0 flex items-center justify-around text-white text-sm">
          <span className="font-bold">{numberRight}</span>
          <span className="font-normal">{normalizedPercentageRight}%</span>
        </div>
      </motion.div>
    </div>
  );
};

export default PercentageBarSVG;
