import { useState } from "react";
import { useLocation } from "wouter";
import CockpitLayout from "@/components/CockpitLayout";
import NavigationPanel from "@/components/NavigationPanel";
import { ChevronLeft, ChevronRight, Home, Search } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export default function Hub() {
  const [, setLocation] = useLocation();
  const [showDoors, setShowDoors] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const { playSound } = useSound();

  const handleNavigation = (planet: string) => {
    setShowDoors(true);
    setDoorsOpen(true);
    setPendingNavigation(planet);
    playSound('door-open');
  };

  const handleDoorsAnimationComplete = () => {
    if (pendingNavigation) {
      setLocation(`/${pendingNavigation}`);
    }
  };

  const handleSideAction = (action: string) => {
    playSound('click');
    console.log(`Side action: ${action}`);
  };

  return (
    <CockpitLayout 
      showDoors={showDoors} 
      doorsOpen={doorsOpen}
      onDoorsAnimationComplete={handleDoorsAnimationComplete}
    >
      {/* Main Viewport */}
      <div 
        className="flex-1 m-4 md:m-8 border-4 border-muted rounded-3xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(222, 84%, 5%) 0%, hsl(235, 39%, 15%) 100%)',
          boxShadow: 'inset 0 0 50px rgba(0, 212, 255, 0.1), 0 0 100px rgba(255, 107, 53, 0.2)'
        }}
        data-testid="viewport"
      >
        {/* Planet Display */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20">
          <div className="planet mx-auto mb-8" data-testid="welcome-planet">
            <div className="absolute top-1/5 left-1/5 w-2/5 h-1/5 bg-white/10 rounded-full transform -rotate-12"></div>
          </div>
          <div className="welcome-text">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary font-orbitron">
              Welcome
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-2 text-foreground font-orbitron">
              ADRIAN DRAXL
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-orbitron">
              COMPUTER SCIENCE STUDENT
            </p>
            <p className="text-sm md:text-base text-muted-foreground mt-2 font-inter">
              Wits University
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Control Panel */}
      <NavigationPanel onNavigate={handleNavigation} />

      {/* Side Navigation Panels - Desktop */}
      <div className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-card border-2 border-border rounded-lg p-4 shadow-2xl z-30">
        <button
          onClick={() => handleSideAction('lookLeft')}
          className="side-arrow bg-muted border-2 border-secondary rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-secondary hover:text-background hover:scale-110 mb-2"
          data-testid="side-arrow-left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleSideAction('returnToHub')}
          className="side-arrow bg-muted border-2 border-secondary rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-secondary hover:text-background hover:scale-110"
          data-testid="side-arrow-home"
        >
          <Home className="w-5 h-5" />
        </button>
      </div>

      <div className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-card border-2 border-border rounded-lg p-4 shadow-2xl z-30">
        <button
          onClick={() => handleSideAction('lookRight')}
          className="side-arrow bg-muted border-2 border-secondary rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-secondary hover:text-background hover:scale-110 mb-2"
          data-testid="side-arrow-right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleSideAction('scanPlanet')}
          className="side-arrow bg-muted border-2 border-secondary rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-secondary hover:text-background hover:scale-110"
          data-testid="side-arrow-scan"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Side Controls */}
      <div className="md:hidden flex justify-around p-4">
        <button
          onClick={() => handleSideAction('lookLeft')}
          className="side-arrow bg-muted border-2 border-secondary rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-secondary hover:text-background hover:scale-110"
          data-testid="mobile-arrow-left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleSideAction('returnToHub')}
          className="side-arrow bg-muted border-2 border-secondary rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-secondary hover:text-background hover:scale-110"
          data-testid="mobile-arrow-home"
        >
          <Home className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleSideAction('scanPlanet')}
          className="side-arrow bg-muted border-2 border-secondary rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-secondary hover:text-background hover:scale-110"
          data-testid="mobile-arrow-scan"
        >
          <Search className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleSideAction('lookRight')}
          className="side-arrow bg-muted border-2 border-secondary rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-secondary hover:text-background hover:scale-110"
          data-testid="mobile-arrow-right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </CockpitLayout>
  );
}
