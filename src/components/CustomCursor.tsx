import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check for custom cursor targets
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;

      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor') || '');
        setIsHovered(true);
      } else if (target?.closest('a, button, [role="button"]')) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Smooth trailing position animation
  useEffect(() => {
    if (isTouch) return;

    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const follow = () => {
      setTrailingPos((prev) => ({
        x: lerp(prev.x, position.x, 0.22),
        y: lerp(prev.y, position.y, 0.22),
      }));
      animationFrameId = requestAnimationFrame(follow);
    };

    animationFrameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Primary sharp center dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-[#FF4500] rounded-none pointer-events-none z-[9999] transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
        }}
      />

      {/* Outer interactive ring / label box */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-200 ease-out flex items-center justify-center ${
          cursorText
            ? 'px-3 py-1.5 bg-[#FF4500] text-white border border-[#FF4500] font-mono text-[11px] font-bold tracking-widest'
            : isHovered
            ? 'w-10 h-10 border border-[#FF4500] bg-[#FF4500]/10'
            : 'w-7 h-7 border border-[#111111]/30 bg-transparent'
        }`}
        style={{
          transform: cursorText
            ? `translate3d(${trailingPos.x + 12}px, ${trailingPos.y + 12}px, 0)`
            : `translate3d(${trailingPos.x - (isHovered ? 20 : 14)}px, ${trailingPos.y - (isHovered ? 20 : 14)}px, 0)`,
        }}
      >
        {cursorText && <span>{cursorText}</span>}
      </div>
    </>
  );
};
