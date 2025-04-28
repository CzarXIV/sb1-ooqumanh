import React from 'react';

interface MarqueeTextProps {
  text: string;
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
  repeat?: number;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({ 
  text, 
  speed = 'medium', 
  className = '', 
  repeat = 4 
}) => {
  const speedMap = {
    slow: 'animate-[marquee_40s_linear_infinite]',
    medium: 'animate-[marquee_25s_linear_infinite]',
    fast: 'animate-[marquee_15s_linear_infinite]',
  };

  const repeatedText = Array(repeat).fill(text).join(' • ');

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`inline-block ${speedMap[speed]}`}>
        {repeatedText}
      </div>
      <div className={`inline-block ${speedMap[speed]}`} aria-hidden="true">
        {repeatedText}
      </div>
    </div>
  );
};

export default MarqueeText;