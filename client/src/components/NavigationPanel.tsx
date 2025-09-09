import { useLocation } from "wouter";
import { User, Rocket, Cog, Satellite } from "lucide-react";
import { useSound } from "@/hooks/useSound";

interface NavigationPanelProps {
  onNavigate?: (planet: string) => void;
}

export default function NavigationPanel({ onNavigate }: NavigationPanelProps) {
  const [, setLocation] = useLocation();
  const { playSound } = useSound();

  const navigationItems = [
    {
      id: "about",
      label: "ABOUT",
      description: "Personal Info",
      icon: User,
      path: "/about"
    },
    {
      id: "projects", 
      label: "PROJECTS",
      description: "Mission Log",
      icon: Rocket,
      path: "/projects"
    },
    {
      id: "skills",
      label: "SKILLS", 
      description: "Tech Arsenal",
      icon: Cog,
      path: "/skills"
    },
    {
      id: "contact",
      label: "CONTACT",
      description: "Communication", 
      icon: Satellite,
      path: "/contact"
    }
  ];

  const handleNavigation = (item: typeof navigationItems[0]) => {
    playSound('click');
    
    if (onNavigate) {
      onNavigate(item.id);
    } else {
      setLocation(item.path);
    }
  };

  return (
    <div 
      className="bg-card border-2 border-border rounded-lg p-6 m-4 shadow-2xl"
      data-testid="navigation-panel"
    >
      {/* Status Display */}
      <div className="bg-muted rounded-md p-3 mb-6 flex justify-between items-center font-mono text-sm">
        <span>NAVIGATION SYSTEM</span>
        <div className="status-light" data-testid="status-light"></div>
      </div>
      
      {/* Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className="nav-button-ripple relative overflow-hidden bg-gradient-to-br from-muted to-border border-2 border-secondary rounded-lg p-4 text-foreground font-orbitron font-semibold cursor-pointer transition-all duration-300 hover:from-secondary hover:to-primary hover:border-accent hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30 active:scale-95"
              data-testid={`nav-button-${item.id}`}
            >
              <div className="flex items-center justify-center mb-2">
                <IconComponent className="w-6 h-6 mr-2" />
                {item.label}
              </div>
              <div className="text-xs opacity-70 font-inter">
                {item.description}
              </div>
            </button>
          );
        })}
      </div>
      
      {/* System Status */}
      <div className="bg-muted rounded-md p-3 flex justify-between items-center font-mono text-sm">
        <span>SYSTEM STATUS: OPERATIONAL</span>
        <div className="flex space-x-2">
          <div className="status-light" data-testid="status-light-1"></div>
          <div className="status-light" style={{ animationDelay: '0.5s' }} data-testid="status-light-2"></div>
          <div className="status-light" style={{ animationDelay: '1s' }} data-testid="status-light-3"></div>
        </div>
      </div>
    </div>
  );
}
