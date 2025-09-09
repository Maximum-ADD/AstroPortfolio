import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export default function AudioControls() {
  const { soundEnabled, toggleSound, playSound } = useSound();

  const handleToggle = () => {
    playSound('click');
    toggleSound();
  };

  return (
    <div className="absolute top-4 right-4 z-40" data-testid="audio-controls">
      <button
        onClick={handleToggle}
        className="bg-muted border-2 border-border rounded-lg p-2 text-foreground cursor-pointer transition-all duration-300 hover:bg-secondary hover:border-accent"
        data-testid="audio-toggle"
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
