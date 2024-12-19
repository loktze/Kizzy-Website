// src/components/PortalCard.tsx

import { motion, Variants } from 'framer-motion';
import React from 'react';

interface PortalCardProps {
  variants: Variants;
  custom?: 'up' | 'down' | number;
  children?: React.ReactNode;
  className?: string; // Allow passing additional classNames
}

const PortalCard: React.FC<PortalCardProps> = ({
  variants,
  custom,
  children,
  className = '',
}) => {
  return (
    <motion.div
      variants={variants}
      custom={custom} // Accepts 'up' | 'down' or number
      className={`shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PortalCard;
