import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import CockpitLayout from "@/components/CockpitLayout";
import { ArrowLeft, User, MapPin, Calendar, GraduationCap, ChevronLeft, ChevronRight, Target, Heart, Code, Rocket } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export default function About() {
  const [, setLocation] = useLocation();
  const [showDoors, setShowDoors] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const { playSound } = useSound();

  const sections = [
    {
      id: 'personal',
      title: 'PERSONAL INFO',
      subtitle: 'Mission Commander Details'
    },
    {
      id: 'education',
      title: 'EDUCATION & TRAINING',
      subtitle: 'Academic Mission Parameters'
    },
    {
      id: 'interests',
      title: 'INTERESTS & HOBBIES',
      subtitle: 'Off-Duty Activities'
    },
    {
      id: 'mission',
      title: 'MISSION STATEMENT',
      subtitle: 'Primary Objectives'
    }
  ];

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

  const handleSectionNavigation = (direction: 'left' | 'right') => {
    playSound('click');
    if (direction === 'left') {
      setCurrentSection(prev => prev > 0 ? prev - 1 : sections.length - 1);
    } else {
      setCurrentSection(prev => prev < sections.length - 1 ? prev + 1 : 0);
    }
  };

  const renderSectionContent = () => {
    switch (currentSection) {
      case 0: // Personal Info
        return (
          <>
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
          </>
        );
      
      case 1: // Education & Training
        return (
          <>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground font-orbitron mb-4 flex items-center">
                <GraduationCap className="w-6 h-6 mr-3 text-secondary" />
                ACADEMIC CREDENTIALS
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold text-primary font-orbitron">Bachelor of Science - Computer Science</h3>
                  <p className="text-card-foreground">University of the Witwatersrand</p>
                  <p className="text-muted-foreground text-sm">2022 - Present</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="font-bold text-secondary font-orbitron">Core Specializations</h3>
                  <ul className="list-disc list-inside text-card-foreground space-y-1">
                    <li>Software Engineering & Development</li>
                    <li>Data Structures & Algorithms</li>
                    <li>Database Design & Management</li>
                    <li>Web Technologies & Frameworks</li>
                  </ul>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="font-bold text-accent font-orbitron">Advanced Training Modules</h3>
                  <ul className="list-disc list-inside text-card-foreground space-y-1">
                    <li>Machine Learning & AI Fundamentals</li>
                    <li>Network Security & Cybersecurity</li>
                    <li>Mobile Application Development</li>
                    <li>Cloud Computing & DevOps</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        );
      
      case 2: // Interests & Hobbies
        return (
          <>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground font-orbitron mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-3 text-accent" />
                OFF-DUTY ACTIVITIES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Code className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold font-orbitron text-primary">Coding & Development</h3>
                      <p className="text-card-foreground text-sm">Building personal projects, contributing to open source, and exploring new technologies</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Rocket className="w-5 h-5 text-secondary mt-1" />
                    <div>
                      <h3 className="font-semibold font-orbitron text-secondary">Space & Technology</h3>
                      <p className="text-card-foreground text-sm">Following space exploration missions, tech innovations, and scientific breakthroughs</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <h3 className="font-semibold font-orbitron text-accent">Problem Solving</h3>
                      <p className="text-card-foreground text-sm">Competitive programming, puzzle solving, and algorithm challenges</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-destructive mt-1" />
                    <div>
                      <h3 className="font-semibold font-orbitron text-destructive">Collaboration</h3>
                      <p className="text-card-foreground text-sm">Team projects, hackathons, and knowledge sharing with fellow developers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      
      case 3: // Mission Statement
        return (
          <>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground font-orbitron mb-4 flex items-center">
                <Target className="w-6 h-6 mr-3 text-primary" />
                PRIMARY MISSION OBJECTIVES
              </h2>
              <div className="space-y-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-lg text-card-foreground leading-relaxed italic">
                    "To push the boundaries of technological innovation through creative problem-solving, 
                    continuous learning, and collaborative development of solutions that make a positive 
                    impact on the digital frontier."
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/20 rounded-lg">
                    <Code className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-orbitron font-semibold text-primary mb-2">INNOVATE</h3>
                    <p className="text-sm text-card-foreground">Develop cutting-edge solutions using modern technologies</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <GraduationCap className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <h3 className="font-orbitron font-semibold text-secondary mb-2">LEARN</h3>
                    <p className="text-sm text-card-foreground">Continuously expand knowledge and skills in emerging fields</p>
                  </div>
                  <div className="text-center p-4 bg-accent/20 rounded-lg">
                    <Heart className="w-8 h-8 text-accent mx-auto mb-2" />
                    <h3 className="font-orbitron font-semibold text-accent mb-2">CONNECT</h3>
                    <p className="text-sm text-card-foreground">Build meaningful collaborations in the tech community</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      
      default:
        return null;
    }
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
              {sections[currentSection].title}
            </h1>
            <p className="text-muted-foreground font-inter">{sections[currentSection].subtitle}</p>
            <div className="flex justify-center space-x-2 mt-4">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSection ? 'bg-primary' : 'bg-muted'
                  } transition-all duration-300`}
                />
              ))}
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="max-w-4xl mx-auto space-y-6">
            {renderSectionContent()}
          </div>
        </div>
      </div>

      {/* Side Navigation Panels - Desktop */}
      <div className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-card border-2 border-border rounded-lg p-4 shadow-2xl z-30">
        <button
          onClick={() => handleSectionNavigation('left')}
          className="side-arrow bg-muted border-2 border-secondary rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-secondary hover:text-background hover:scale-110 mb-2"
          data-testid="section-arrow-left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-xs text-muted-foreground text-center font-orbitron">
          EXPLORE
        </div>
      </div>

      <div className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-card border-2 border-border rounded-lg p-4 shadow-2xl z-30">
        <button
          onClick={() => handleSectionNavigation('right')}
          className="side-arrow bg-muted border-2 border-secondary rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-secondary hover:text-background hover:scale-110 mb-2"
          data-testid="section-arrow-right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="text-xs text-muted-foreground text-center font-orbitron">
          EXPLORE
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
