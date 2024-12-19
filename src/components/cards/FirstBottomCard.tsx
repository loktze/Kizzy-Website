'use client';

import React from 'react';
import { Variants } from 'framer-motion';
import TruncatedText from '../TruncatedText';
import PortalCard from '../PortalCard';

interface FirstBottomCardProps {
  customDelay?: number;
  className?: string;
}

const firstBottomCardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay },
  }),
  exit: { opacity: 0, y: 50, transition: { duration: 0.8, ease: 'easeIn' } },
};

const FirstBottomCard: React.FC<FirstBottomCardProps> = ({ customDelay = 0, className }) => {
  return (
    <PortalCard
      variants={firstBottomCardVariants}
      custom={customDelay}
      className={`w-[340px] bg-[#fff] rounded-2xl p-5 ${className || ''}`}
    >
      <div className="flex justify-between items-center">
        <img
          src="/images/youtube-logo.png"
          alt="YouTube Logo"
          width={43}
          height={30}
          loading="lazy" // Optional: enables native lazy loading
        />
        <div className="flex items-center justify-between gap-8 bg-[#F3F3F7] rounded-full px-5 py-2">
          <TruncatedText
            text="I Bought My First Car..."
            maxLength={21}
            className="text-[#B4B4B4] text-xs"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#B4B4B4"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-center items-center mt-3.5">
        <img
          src="/images/youtube-post.png"
          alt="YouTube Post"
          width={322}
          height={181}
          loading="lazy" // Optional: enables native lazy loading
        />
      </div>
      <div className="mt-3 flex gap-2.5 items-start">
        <div className="w-9 h-9">
          <img
            src="/images/youtube-creator-pfp.png"
            alt="YouTube Creator Profile"
            width={36}
            height={36}
            className="object-contain"
            loading="lazy" // Optional: enables native lazy loading
          />
        </div>
        <div className="flex flex-col justify-center flex-1 gap-0.5">
          <TruncatedText
            text="IShowSpeed"
            maxLength={21}
            className="font-lexend text-md text-[#0E1727] font-semibold"
          />
          <p className="font-lexend text-sm text-[#A3A3A3]">@IShowSpeed . 3280m followers</p>
          <p className="font-lexend rounded-3xl bg-black text-xs text-white px-2 py-1 mt-2 w-fit">Follow</p>
        </div>
      </div>
    </PortalCard>
  );
};

export default FirstBottomCard;
