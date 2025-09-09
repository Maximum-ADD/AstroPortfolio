import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import CockpitLayout from "@/components/CockpitLayout";
import { ArrowLeft, Rocket, ExternalLink, Github, Star } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export default function Projects() {
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

  const projects = [
    {
      id: 1,
      title: "Quantum Calculator",
      description: "Advanced computational tool for quantum mechanics calculations and simulations.",
      status: "Active Mission",
      tech: ["React", "TypeScript", "WebGL"],
      priority: "High"
    },
    {
      id: 2,
      title: "Neural Network Visualizer",
      description: "Interactive platform for visualizing and understanding deep learning architectures.",
      status: "Development Phase",
      tech: ["Python", "TensorFlow", "D3.js"],
      priority: "Medium"
    },
    {
      id: 3,
      title: "Space Station Manager",
      description: "Resource management system for orbital platforms and space missions.",
      status: "Planning Phase",
      tech: ["Node.js", "MongoDB", "Three.js"],
      priority: "Low"
    },
    {
      id: 4,
      title: "Cosmic Data Pipeline",
      description: "Automated data processing system for astronomical observations and analysis.",
      status: "Research Phase",
      tech: ["Python", "Apache Kafka", "Docker"],
      priority: "Medium"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-destructive';
      case 'Medium': return 'text-accent';
      case 'Low': return 'text-secondary';
      default: return 'text-muted-foreground';
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
        data-testid="projects-viewport"
      >
        <div className="absolute inset-0 p-8 overflow-y-auto">
          {/* Planet Header */}
          <div className="text-center mb-8">
            <div 
              className="w-32 h-32 mx-auto mb-4 rounded-full"
              style={{
                background: 'linear-gradient(45deg, var(--primary), var(--accent))',
                boxShadow: '0 0 40px rgba(255, 107, 53, 0.6), inset -10px -10px 20px rgba(0, 0, 0, 0.3)',
                animation: 'rotate 20s infinite linear, pulse-glow 4s infinite ease-in-out'
              }}
              data-testid="projects-planet"
            >
              <div className="w-full h-full flex items-center justify-center">
                <Rocket className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary font-orbitron mb-2">
              PROJECTS PLANET
            </h1>
            <p className="text-muted-foreground font-inter">Mission Control & Development Log</p>
          </div>

          {/* Mission Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary font-orbitron">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Active Missions</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-secondary font-orbitron">∞</div>
              <div className="text-sm text-muted-foreground">Lines of Code</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent font-orbitron">24/7</div>
              <div className="text-sm text-muted-foreground">Development Cycle</div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground font-orbitron mb-4">
              CURRENT MISSIONS
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 transition-all duration-300 hover:border-secondary hover:shadow-lg hover:shadow-secondary/20"
                  data-testid={`project-card-${project.id}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-foreground font-orbitron">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Star className={`w-4 h-4 ${getPriorityColor(project.priority)}`} />
                      <span className={`text-xs font-orbitron ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-card-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-2">Status:</div>
                    <div className="text-secondary font-orbitron font-semibold">
                      {project.status}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-2">Technologies:</div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-muted px-2 py-1 rounded text-xs font-orbitron text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-1 text-sm text-secondary hover:text-accent transition-colors cursor-pointer">
                      <Github className="w-4 h-4" />
                      <span>Repository</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-secondary hover:text-accent transition-colors cursor-pointer">
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Control Message */}
          <div className="mt-8 bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground font-orbitron mb-4">
              MISSION CONTROL TRANSMISSION
            </h2>
            <p className="text-card-foreground leading-relaxed">
              All projects shown are currently in development or planning phases. Each mission 
              represents a unique challenge in the vast expanse of computer science. GitHub 
              repositories and live demonstrations will be available as missions reach 
              operational status.
            </p>
            <br />
            <p className="text-muted-foreground text-sm font-orbitron">
              STATUS: All systems nominal. Continue mission parameters.
            </p>
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
