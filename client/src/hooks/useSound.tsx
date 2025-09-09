import { useState, useCallback, useRef, useEffect } from "react";

type SoundType = 'click' | 'door-open' | 'door-close' | 'planet-entry' | 'hover';

interface UseSound {
  soundEnabled: boolean;
  toggleSound: () => void;
  playSound: (soundType: SoundType) => void;
}

export function useSound(): UseSound {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudioContext = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    document.addEventListener('click', initAudioContext, { once: true });
    return () => {
      document.removeEventListener('click', initAudioContext);
    };
  }, []);

  const generateTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!soundEnabled || !audioContextRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration);

      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration);
    } catch (error) {
      console.warn('Sound generation failed:', error);
    }
  }, [soundEnabled]);

  const playSound = useCallback((soundType: SoundType) => {
    if (!soundEnabled) return;

    switch (soundType) {
      case 'click':
        generateTone(800, 0.1, 'square');
        break;
      case 'door-open':
        // Sliding door sound effect
        generateTone(400, 0.3, 'sawtooth');
        setTimeout(() => generateTone(600, 0.2, 'sawtooth'), 200);
        break;
      case 'door-close':
        generateTone(600, 0.3, 'sawtooth');
        setTimeout(() => generateTone(400, 0.2, 'sawtooth'), 200);
        break;
      case 'planet-entry':
        generateTone(200, 0.5, 'sine');
        setTimeout(() => generateTone(400, 0.3, 'sine'), 300);
        setTimeout(() => generateTone(800, 0.2, 'sine'), 600);
        break;
      case 'hover':
        generateTone(1000, 0.05, 'sine');
        break;
      default:
        break;
    }
  }, [soundEnabled, generateTone]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  return {
    soundEnabled,
    toggleSound,
    playSound
  };
}
