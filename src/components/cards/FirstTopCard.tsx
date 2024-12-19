'use client';

import React from 'react';
import { Variants } from 'framer-motion';
import TruncatedText from '../TruncatedText';
import PortalCard from '../PortalCard';

interface FirstTopCardProps {
  customDelay?: number;
  className?: string;
}

const firstTopCardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay },
  }),
  exit: { opacity: 0, y: 50, transition: { duration: 0.8, ease: 'easeIn' } },
};

const FirstTopCard: React.FC<FirstTopCardProps> = ({ customDelay = 0, className }) => {
  return (
    <PortalCard
      variants={firstTopCardVariants}
      custom={customDelay}
      className={`w-[340px] bg-[#F5F5F5] rounded-2xl ${className || ''}`}
    >
      <div className="flex justify-between items-center gap-2">
        <img
          src="/images/youtube_picture.png"
          alt="YouTube Post"
          width={120}
          height={70}
          className="rounded-lg object-cover"
          loading="lazy"
        />
        <div className="flex flex-col justify-center flex-1 gap-2">
          <TruncatedText
            text="I Bought My First Car blah blah blah"
            maxLength={21}
            className="font-lexend text-md text-[#0E1727] font-semibold leading-6 tracking-tight"
          />
          <p className="font-lexend text-sm text-[#A3A3A3]">@IShowSpeed | Likes</p>
        </div>
      </div>

      {/* Optional: Uncomment if you have a PercentageBarSVG component */}
      {/* <div className="mt-4 mb-4">
        <PercentageBarSVG
          numberLeft="124,991"
          percentageLeft={50}
          numberRight="932,32"
          percentageRight={50}
        />
      </div> */}
    </PortalCard>
  );
};

export default FirstTopCard;
