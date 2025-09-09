import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import CockpitLayout from "@/components/CockpitLayout";
import { ArrowLeft, Satellite, Mail, MessageSquare, User, Send } from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [, setLocation] = useLocation();
  const [showDoors, setShowDoors] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const { playSound } = useSound();
  const { toast } = useToast();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    playSound('click');

    // Simulate transmission delay
    setTimeout(() => {
      setIsTransmitting(false);
      toast({
        title: "TRANSMISSION SUCCESSFUL",
        description: "Your message has been received by Mission Control. We'll respond via subspace communication soon.",
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email Transmission",
      value: "adrian.draxl@students.wits.ac.za",
      description: "Primary communication channel"
    },
    {
      icon: MessageSquare,
      label: "Emergency Contact",
      value: "Available upon request",
      description: "For urgent mission communications"
    },
    {
      icon: Satellite,
      label: "Location Beacon",
      value: "Johannesburg, South Africa",
      description: "Current orbital coordinates"
    }
  ];

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
        data-testid="contact-viewport"
      >
        <div className="absolute inset-0 p-8 overflow-y-auto">
          {/* Planet Header */}
          <div className="text-center mb-8">
            <div 
              className="w-32 h-32 mx-auto mb-4 rounded-full"
              style={{
                background: 'linear-gradient(45deg, var(--secondary), var(--primary))',
                boxShadow: '0 0 40px rgba(0, 212, 255, 0.6), inset -10px -10px 20px rgba(0, 0, 0, 0.3)',
                animation: 'rotate 20s infinite linear, pulse-glow 4s infinite ease-in-out'
              }}
              data-testid="contact-planet"
            >
              <div className="w-full h-full flex items-center justify-center">
                <Satellite className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary font-orbitron mb-2">
              CONTACT PLANET
            </h1>
            <p className="text-muted-foreground font-inter">Communication Hub & Message Center</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Communication Channels */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground font-orbitron mb-6 flex items-center">
                <Satellite className="w-6 h-6 mr-3 text-secondary" />
                COMMUNICATION CHANNELS
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <div 
                      key={index}
                      className="bg-muted/30 rounded-lg p-4 text-center"
                      data-testid={`contact-method-${index}`}
                    >
                      <IconComponent className="w-8 h-8 text-secondary mx-auto mb-3" />
                      <h3 className="font-orbitron font-semibold text-foreground mb-2">
                        {method.label}
                      </h3>
                      <p className="text-card-foreground font-mono text-sm mb-2">
                        {method.value}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {method.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Message Transmission Form */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground font-orbitron mb-6 flex items-center">
                <Send className="w-6 h-6 mr-3 text-accent" />
                MESSAGE TRANSMISSION
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-orbitron text-foreground mb-2">
                      SENDER IDENTIFICATION
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className="pl-10 bg-muted/50 border-border focus:border-secondary"
                        required
                        data-testid="input-name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-orbitron text-foreground mb-2">
                      COMMUNICATION FREQUENCY
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@domain.com"
                        className="pl-10 bg-muted/50 border-border focus:border-secondary"
                        required
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-orbitron text-foreground mb-2">
                    MESSAGE CONTENT
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Enter your message for transmission to Mission Control..."
                      className="pl-10 pt-10 bg-muted/50 border-border focus:border-secondary min-h-32 resize-none"
                      required
                      data-testid="textarea-message"
                    />
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={isTransmitting}
                    className="bg-gradient-to-br from-secondary to-primary hover:from-primary hover:to-accent text-primary-foreground font-orbitron font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="submit-button"
                  >
                    {isTransmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                        <span>TRANSMITTING...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>SEND TRANSMISSION</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Mission Control Notice */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground font-orbitron mb-4">
                MISSION CONTROL NOTICE
              </h2>
              <p className="text-card-foreground leading-relaxed mb-4">
                All transmissions are monitored by Mission Control for quality and training purposes. 
                Response time varies based on current mission parameters and system availability. 
                Priority will be given to collaboration opportunities and technical discussions.
              </p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground font-orbitron">
                  <strong>STATUS:</strong> Communication systems operational. 
                  <br />
                  <strong>RESPONSE TIME:</strong> 24-48 hours standard protocol.
                  <br />
                  <strong>ENCRYPTION:</strong> All messages secured via quantum encryption.
                </p>
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
