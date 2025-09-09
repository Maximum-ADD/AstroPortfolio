import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import CockpitLayout from "@/components/CockpitLayout";
import { ArrowLeft, User, MapPin, Calendar, GraduationCap } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export default function About() {
  const [, setLocation] = useLocation();
  const [showDoors, setShowDoors] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const { playSound } = useSound();

  useEffect(() => {
    // Page entrance animation
    setShowDoors(true);
    setDoorsOpen(true);
    playSound('door-open');
    
    const timer = setTimeout(() => {
      setDoorsOpen(false);
      setShowDoors(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [playSound]);

  const handleReturnToHub = () => {
    setShowDoors(true);
    setDoorsOpen(true);
    playSound('door-open');
    
    setTimeout(() => {
      setLocation('/');
    }, 800);
  };

  return (
    <CockpitLayout 
      showDoors={showDoors} 
      doorsOpen={doorsOpen}
    >
      {/* Main Viewport */}
      <div 
        className="flex-1 m-4 md:m-8 border-4 border-muted rounded-3xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(222, 84%, 5%) 0%, hsl(235, 39%, 15%) 100%)',
          boxShadow: 'inset 0 0 50px rgba(0, 212, 255, 0.1), 0 0 100px rgba(255, 107, 53, 0.2)'
        }}
        data-testid="about-viewport"
      >
        <div className="absolute inset-0 p-8 overflow-y-auto">
          {/* Planet Header */}
          <div className="text-center mb-8">
            <div 
              className="w-32 h-32 mx-auto mb-4 rounded-full"
              style={{
                background: 'linear-gradient(45deg, var(--secondary), var(--accent))',
                boxShadow: '0 0 40px rgba(0, 212, 255, 0.6), inset -10px -10px 20px rgba(0, 0, 0, 0.3)',
                animation: 'rotate 20s infinite linear, pulse-glow 4s infinite ease-in-out'
              }}
              data-testid="about-planet"
            >
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary font-orbitron mb-2">
              ABOUT PLANET
            </h1>
            <p className="text-muted-foreground font-inter">Personal Information Terminal</p>
          </div>

          {/* Bio Content */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground font-orbitron mb-4 flex items-center">
                <User className="w-6 h-6 mr-3 text-primary" />
                MISSION COMMANDER
              </h2>
              <div className="space-y-4 text-card-foreground">
                <div className="flex items-start space-x-3">
                  <GraduationCap className="w-5 h-5 text-secondary mt-1" />
                  <div>
                    <h3 className="font-semibold font-orbitron">Adrian Draxl</h3>
                    <p className="text-muted-foreground">Computer Science Student</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-secondary mt-1" />
                  <div>
                    <h3 className="font-semibold font-orbitron">Base of Operations</h3>
                    <p className="text-muted-foreground">University of the Witwatersrand, Johannesburg</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-secondary mt-1" />
                  <div>
                    <h3 className="font-semibold font-orbitron">Mission Timeline</h3>
                    <p className="text-muted-foreground">Currently pursuing Bachelor's in Computer Science</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground font-orbitron mb-4">
                MISSION BRIEFING
              </h2>
              <p className="text-card-foreground leading-relaxed">
                Greetings, fellow space traveler! I'm Adrian Draxl, a dedicated Computer Science student 
                currently exploring the vast universe of technology and innovation at Wits University. 
                My mission is to push the boundaries of what's possible through code, creativity, and 
                continuous learning.
              </p>
              <br />
              <p className="text-card-foreground leading-relaxed">
                This space station serves as my digital headquarters, where I document my journey 
                through the cosmos of programming, showcase my technological discoveries, and 
                connect with fellow explorers in the digital frontier.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground font-orbitron mb-4">
                CURRENT COORDINATES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-secondary font-orbitron">Academic Sector</h3>
                  <p className="text-card-foreground">Computer Science Program</p>
                  <p className="text-muted-foreground text-sm">University of the Witwatersrand</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-secondary font-orbitron">Specialization</h3>
                  <p className="text-card-foreground">Software Development</p>
                  <p className="text-muted-foreground text-sm">Full-Stack Technologies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center p-4">
        <button
          onClick={handleReturnToHub}
          className="bg-gradient-to-br from-muted to-border border-2 border-secondary rounded-lg px-6 py-3 text-foreground font-orbitron font-semibold cursor-pointer transition-all duration-300 hover:from-secondary hover:to-primary hover:border-accent hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30 active:scale-95 flex items-center space-x-2"
          data-testid="return-to-hub"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>RETURN TO HUB</span>
        </button>
      </div>
    </CockpitLayout>
  );
}
