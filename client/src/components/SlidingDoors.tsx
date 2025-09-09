import { useEffect } from "react";

interface SlidingDoorsProps {
  isOpen: boolean;
  onAnimationComplete?: () => void;
}

export default function SlidingDoors({ isOpen, onAnimationComplete }: SlidingDoorsProps) {
  useEffect(() => {
    if (onAnimationComplete) {
      const timer = setTimeout(onAnimationComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onAnimationComplete]);

  return (
    <div 
      className={`doors fixed inset-0 z-50 pointer-events-none ${isOpen ? 'doors-open' : ''}`}
      data-testid="sliding-doors"
    >
      <div 
        className="door door-left absolute top-0 left-0 w-1/2 h-full door-transition"
        style={{
          background: 'linear-gradient(90deg, var(--muted), var(--border))',
          border: '2px solid var(--secondary)'
        }}
        data-testid="door-left"
      ></div>
      <div 
        className="door door-right absolute top-0 right-0 w-1/2 h-full door-transition"
        style={{
          background: 'linear-gradient(90deg, var(--border), var(--muted))',
          border: '2px solid var(--secondary)'
        }}
        data-testid="door-right"
      ></div>
    </div>
  );
}
