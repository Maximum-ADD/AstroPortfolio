import { useEffect, useRef } from "react";

interface StarfieldProps {
  className?: string;
  starCount: number;
  sizeRange: { min: number; max: number };
  layer: 1 | 2 | 3;
}

export default function Starfield({ 
  className = "", 
  starCount, 
  sizeRange, 
  layer 
}: StarfieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing stars
    container.innerHTML = '';

    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      
      const size = Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      
      // Ensure stars are visible
      star.style.position = 'absolute';
      star.style.backgroundColor = 'white';
      star.style.borderRadius = '50%';
      star.style.pointerEvents = 'none';
      star.style.zIndex = '2';
      
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.animationDuration = (Math.random() * 2 + 2) + 's';
      star.style.animationName = 'twinkle';
      star.style.animationIterationCount = 'infinite';
      star.style.animationTimingFunction = 'ease-in-out';
      
      container.appendChild(star);
    }
  }, [starCount, sizeRange, layer]);

  return (
    <div 
      ref={containerRef}
      className={`starfield layer-${layer} ${className}`}
      data-testid={`starfield-layer-${layer}`}
    />
  );
}
