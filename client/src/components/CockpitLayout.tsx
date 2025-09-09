import { ReactNode } from "react";
import Starfield from "./Starfield";
import AudioControls from "./AudioControls";
import SlidingDoors from "./SlidingDoors";

interface CockpitLayoutProps {
  children: ReactNode;
  showDoors?: boolean;
  doorsOpen?: boolean;
  onDoorsAnimationComplete?: () => void;
}

export default function CockpitLayout({ 
  children, 
  showDoors = false, 
  doorsOpen = false,
  onDoorsAnimationComplete 
}: CockpitLayoutProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Starfield Background */}
      <Starfield 
        starCount={100} 
        sizeRange={{ min: 1, max: 2 }} 
        layer={1} 
      />
      <Starfield 
        starCount={150} 
        sizeRange={{ min: 0.5, max: 1.5 }} 
        layer={2} 
      />
      <Starfield 
        starCount={200} 
        sizeRange={{ min: 0.3, max: 1 }} 
        layer={3} 
      />
      
      {/* Audio Controls */}
      <AudioControls />
      
      {/* Main Cockpit Frame */}
      <div 
        className="cockpit-frame relative w-full h-screen flex flex-col z-10"
        style={{
          background: 'linear-gradient(135deg, hsl(222, 84%, 5%) 0%, hsl(217, 32%, 17%) 50%, hsl(222, 84%, 5%) 100%)'
        }}
        data-testid="cockpit-frame"
      >
        {children}
      </div>
      
      {/* Sliding Doors */}
      {showDoors && (
        <SlidingDoors 
          isOpen={doorsOpen} 
          onAnimationComplete={onDoorsAnimationComplete}
        />
      )}
    </div>
  );
}
