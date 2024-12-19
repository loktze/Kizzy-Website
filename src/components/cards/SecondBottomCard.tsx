'use client';

import React from 'react';
import { Variants } from 'framer-motion';
import TruncatedText from '../TruncatedText';
import PortalCard from '../PortalCard';

interface SecondBottomCardProps {
  customDelay?: number;
  className?: string;
}

const secondBottomCardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay },
  }),
  exit: { opacity: 0, y: 50, transition: { duration: 0.8, ease: 'easeIn' } },
};

const SecondBottomCard: React.FC<SecondBottomCardProps> = ({ customDelay = 0, className }) => {
  return (
    <PortalCard
      variants={secondBottomCardVariants}
      custom={customDelay}
      className={`w-[340px] bg-[#fff] rounded-2xl p-4 ${className || ''}`}
    >
      {/* Card Content */}
      <div className="flex justify-between">
        <div className="flex gap-2.5">
          <img
            src="/images/twitter-creator-pfp-circle.png"
            alt="Twitter Circle Pfp"
            width={36}
            height={36}
            className="object-contain"
            loading="lazy" // Optional: enables native lazy loading
          />
          <div className="flex flex-col justify-center flex-1">
            <div className="flex gap-0.5">
              <TruncatedText
                text="Elon Musk"
                maxLength={21}
                className="font-lexend text-xs text-[#0E1727] font-semibold"
              />
              <img
                src="/images/twitter-tick.png"
                alt="Twitter Verified Icon"
                width={14}
                height={14}
                className="object-contain"
                loading="lazy" // Optional: enables native lazy loading
              />
              <img
                src="/images/twitter-x.png"
                alt="Twitter X Icon"
                width={10}
                height={10}
                className="object-contain"
                loading="lazy" // Optional: enables native lazy loading
              />
            </div>
            <p className="font-lexend text-xs text-[#A3A3A3]">@elonmusk</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full border border-[#CFD9DF] flex items-center justify-center w-10 h-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#000000"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <div className="flex bg-black py-2 px-3 rounded-full items-center">
            <p className="font-lexend text-white text-center">Follow</p>
          </div>
        </div>
      </div>
      <div className="flex mt-1">
        <p className="font-lexend text-xs text-black">
          I am increasingly convinced that<br />
          @Neuralink<br />
          should prioritize making an implant that can eliminate back & neck pain.
        </p>
      </div>
      <div className="flex pt-2">
        <img
          src="/images/twitter-post.png"
          alt="Twitter Post"
          width={320}
          height={176}
          className="object-contain mx-auto"
          loading="lazy" // Optional: enables native lazy loading
        />
      </div>
    </PortalCard>
  );
};

export default SecondBottomCard;
