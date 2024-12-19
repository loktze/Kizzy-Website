// src/components/TruncatedText.tsx

import React from 'react';

interface TruncatedTextProps {
  text: string;
  maxLength: number;
  className?: string;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ text, maxLength, className }) => {
  const truncated = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  return (
    <span
      className={`truncate ${className}`}
      title={text.length > maxLength ? text : undefined} // Tooltip shows full text on hover if truncated
    >
      {truncated}
    </span>
  );
};

export default TruncatedText;
