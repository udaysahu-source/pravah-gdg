import React from 'react';

interface MarqueeProps {
  variant?: 'dark' | 'orange' | 'outline';
  items?: string[];
  skew?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
  variant = 'dark',
  items = [
    'DSA WITH C++',
    'HACKATHONS',
    'OPEN SOURCE',
    'AI & COMPUTER VISION',
    'SOFTWARE SYSTEMS',
    'PRAVAH',
    'OFFLINE-FIRST',
    'PROBLEM SOLVING',
    'BUILDING PROTOTYPES',
    'SSIPMT RAIPUR',
  ],
  skew = false,
}) => {
  const styles = {
    dark: 'bg-[#111111] text-[#F4F2EC] border-y border-[#333333]',
    orange: 'bg-[#FF4500] text-[#111111] border-y border-[#111111]',
    outline: 'bg-transparent text-[#111111] border-y border-[#111111]/20',
  }[variant];

  const dotColor = variant === 'orange' ? 'text-[#111111]' : 'text-[#FF4500]';

  // Duplicate items for continuous seamless loop
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden py-3 sm:py-4 select-none ${styles} ${
        skew ? '-rotate-1 my-8 scale-105 shadow-md' : ''
      }`}
      role="region"
      aria-label="Scrolling Highlights Ticker"
    >
      <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <span className="font-heading font-black tracking-widest text-sm sm:text-base uppercase">
              {item}
            </span>
            <span className={`text-xs ${dotColor}`}>●</span>
          </div>
        ))}
      </div>
    </div>
  );
};
