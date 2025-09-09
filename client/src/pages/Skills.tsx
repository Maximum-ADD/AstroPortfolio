import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import CockpitLayout from "@/components/CockpitLayout";
import { ArrowLeft, Cog, Zap, Shield, Target } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export default function Skills() {
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

  const skillCategories = [
    {
      id: 1,
      title: "Programming Languages",
      icon: Zap,
      color: "primary",
      skills: [
        { name: "JavaScript", level: 85, status: "Operational" },
        { name: "TypeScript", level: 80, status: "Operational" },
        { name: "Python", level: 75, status: "Operational" },
        { name: "Java", level: 70, status: "Operational" },
        { name: "C++", level: 65, status: "Learning" },
        { name: "Rust", level: 45, status: "Training" }
      ]
    },
    {
      id: 2,
      title: "Web Technologies",
      icon: Shield,
      color: "secondary",
      skills: [
        { name: "React", level: 90, status: "Operational" },
        { name: "Node.js", level: 85, status: "Operational" },
        { name: "HTML/CSS", level: 95, status: "Operational" },
        { name: "Express.js", level: 80, status: "Operational" },
        { name: "Next.js", level: 75, status: "Learning" },
        { name: "Vue.js", level: 60, status: "Training" }
      ]
    },
    {
      id: 3,
      title: "Data & Databases",
      icon: Target,
      color: "accent",
      skills: [
        { name: "PostgreSQL", level: 75, status: "Operational" },
        { name: "MongoDB", level: 70, status: "Operational" },
        { name: "Redis", level: 65, status: "Learning" },
        { name: "MySQL", level: 80, status: "Operational" },
        { name: "GraphQL", level: 60, status: "Learning" },
        { name: "Firebase", level: 70, status: "Operational" }
      ]
    },
    {
      id: 4,
      title: "Tools & Platforms",
      icon: Cog,
      color: "destructive",
      skills: [
        { name: "Git/GitHub", level: 90, status: "Operational" },
        { name: "Docker", level: 70, status: "Learning" },
        { name: "AWS", level: 60, status: "Training" },
        { name: "Linux", level: 75, status: "Operational" },
        { name: "Figma", level: 80, status: "Operational" },
        { name: "Postman", level: 85, status: "Operational" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational': return 'text-secondary';
      case 'Learning': return 'text-accent';
      case 'Training': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 80) return 'bg-secondary';
    if (level >= 60) return 'bg-accent';
    return 'bg-primary';
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
        data-testid="skills-viewport"
      >
        <div className="absolute inset-0 p-8 overflow-y-auto">
          {/* Planet Header */}
          <div className="text-center mb-8">
            <div 
              className="w-32 h-32 mx-auto mb-4 rounded-full"
              style={{
                background: 'linear-gradient(45deg, var(--accent), var(--secondary))',
                boxShadow: '0 0 40px rgba(255, 194, 64, 0.6), inset -10px -10px 20px rgba(0, 0, 0, 0.3)',
                animation: 'rotate 20s infinite linear, pulse-glow 4s infinite ease-in-out'
              }}
              data-testid="skills-planet"
            >
              <div className="w-full h-full flex items-center justify-center">
                <Cog className="w-12 h-12 text-accent-foreground" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary font-orbitron mb-2">
              SKILLS PLANET
            </h1>
            <p className="text-muted-foreground font-inter">Technical Arsenal & Capabilities</p>
          </div>

          {/* Skill Categories */}
          <div className="space-y-8">
            {skillCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div 
                  key={category.id}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
                  data-testid={`skill-category-${category.id}`}
                >
                  <div className="flex items-center mb-6">
                    <IconComponent className={`w-6 h-6 mr-3 text-${category.color}`} />
                    <h2 className="text-2xl font-bold text-foreground font-orbitron">
                      {category.title}
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.skills.map((skill, index) => (
                      <div 
                        key={index}
                        className="bg-muted/30 rounded-lg p-4"
                        data-testid={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-orbitron font-semibold text-foreground">
                            {skill.name}
                          </span>
                          <span className={`text-xs font-orbitron ${getStatusColor(skill.status)}`}>
                            {skill.status}
                          </span>
                        </div>
                        
                        <div className="mb-2">
                          <div className="w-full bg-border rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getLevelColor(skill.level)} transition-all duration-1000 ease-out`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Proficiency</span>
                          <span>{skill.level}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Skill Summary */}
          <div className="mt-8 bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground font-orbitron mb-4">
              ARSENAL OVERVIEW
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary font-orbitron">
                  {skillCategories.reduce((total, cat) => total + cat.skills.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Skills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent font-orbitron">
                  {skillCategories.reduce((total, cat) => 
                    total + cat.skills.filter(skill => skill.status === 'Operational').length, 0
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Operational</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary font-orbitron">
                  {skillCategories.reduce((total, cat) => 
                    total + cat.skills.filter(skill => skill.status === 'Learning').length, 0
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Learning</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive font-orbitron">
                  {skillCategories.reduce((total, cat) => 
                    total + cat.skills.filter(skill => skill.status === 'Training').length, 0
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Training</div>
              </div>
            </div>
            <p className="text-card-foreground leading-relaxed">
              This arsenal represents my current technological capabilities across multiple domains. 
              Skills marked as "Operational" are production-ready, "Learning" indicates active development, 
              and "Training" represents areas of focused study and improvement.
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
