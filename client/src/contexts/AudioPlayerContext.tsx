import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface CurrentProgram {
  title: string;
  description: string;
  image: string;
}

interface AudioPlayerContextType {
  isPlaying: boolean;
  volume: number;
  currentProgram: CurrentProgram;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setCurrentProgram: (program: CurrentProgram) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(70);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentProgram, setCurrentProgram] = useState<CurrentProgram>({
    title: 'Ao Vivo - 87.9 FM',
    description: 'Aperte o Play FM',
    image: '',
  });

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume / 100;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.src = 'https://186.250.8.32:6750/stream';
      audioRef.current.play().catch(err => {
        console.log('Audio play error:', err);
      });
      setIsPlaying(true);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        volume,
        currentProgram,
        togglePlay,
        setVolume,
        setCurrentProgram,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  }
  return context;
}
