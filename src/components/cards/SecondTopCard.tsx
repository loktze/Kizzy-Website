'use client';

import React from 'react';
import { Variants } from 'framer-motion';
import TruncatedText from '../TruncatedText';
import PortalCard from '../PortalCard';

interface SecondTopCardProps {
  customDelay?: number;
  className?: string;
}

const secondTopCardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay },
  }),
  exit: { opacity: 0, y: 50, transition: { duration: 0.8, ease: 'easeIn' } },
};

const SecondTopCard: React.FC<SecondTopCardProps> = ({ customDelay = 0, className }) => {
  return (
    <PortalCard
      variants={secondTopCardVariants}
      custom={customDelay}
      className={`w-[340px] bg-[#F5F5F5] rounded-tl-2xl rounded-b-2xl ${className || ''}`}
    >
      <div className="relative w-full inline-block">
        <div className="absolute -top-5 right-0 bg-black font-lexend text-white text-[8px] px-3 py-1 rounded-t-xl">
          PVP Pool
        </div>
        <div>
          <div className="flex p-4 justify-between">
            <div className="flex gap-2.5">
              <img
                src="/images/twitter-creator-pfp.png"
                alt="Twitter Pfp"
                width={79}
                height={79}
                className="object-contain"
                loading="lazy"
              />
              <div className="flex flex-col justify-center flex-1 gap-1.5">
                <TruncatedText
                  text="Elon Musk"
                  maxLength={21}
                  className="font-lexend text-md text-[#0E1727] font-semibold"
                />
                <p className="font-lexend text-sm text-[#A3A3A3]">@elonmusk</p>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <img
                src="/images/Live.png"
                alt="Live Indicator"
                width={41}
                height={18}
                className="object-contain"
                loading="lazy"
              />
              <img
                src="/images/up_green.png"
                alt="Up Green Indicator"
                width={39}
                height={29}
                className="object-contain"
                loading="lazy"
              />
            </div>
          </div>
          <div className="bg-[#EFEFEF] py-3 px-5 rounded-b-2xl">
            <p className="font-lexend text-xs text-[#07010D] font-semibold">7 Days Stranded On An Island</p>
            <div className="flex gap-9 mt-2.5">
              <div className="flex gap-1">
                <img
                  src="/images/coin.png"
                  alt="Coin Icon"
                  width={13}
                  height={13}
                  className="object-contain"
                  loading="lazy"
                />
                <p className="font-lexend text-sm text-[#E09E00] font-semibold">15,153</p>
              </div>
              <div className="flex items-center">
                <p className="text-[#8663FF] font-semibold text-sm">
                  123k <span className="font-lexend text-sm font-normal"> Views </span>
                  <span className="font-lexend text-[#BEABFF] text-xs font-normal"> in 12 hr</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalCard>
  );
};

export default SecondTopCard;
