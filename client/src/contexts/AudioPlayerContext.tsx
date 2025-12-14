import { createContext, useContext, useState, useRef, useEffect, useCallback, ReactNode } from 'react';

interface CurrentProgram {
  title: string;
  description: string;
  image: string;
}

interface AudioPlayerContextType {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  currentProgram: CurrentProgram;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setCurrentProgram: (program: CurrentProgram) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

const STREAM_URL = '/api/stream';

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(70);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentProgram, setCurrentProgram] = useState<CurrentProgram>({
    title: 'Ao Vivo - 87.9 FM',
    description: 'Aperte o Play FM',
    image: '',
  });

  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume / 100;
    audio.preload = 'none';
    
    audio.addEventListener('playing', () => {
      setIsPlaying(true);
      setIsLoading(false);
    });
    
    audio.addEventListener('pause', () => {
      setIsPlaying(false);
      setIsLoading(false);
    });
    
    audio.addEventListener('error', () => {
      console.log('Erro no audio');
      setIsPlaying(false);
      setIsLoading(false);
    });
    
    audio.addEventListener('waiting', () => {
      setIsLoading(true);
    });
    
    audio.addEventListener('canplay', () => {
      setIsLoading(false);
    });
    
    audioRef.current = audio;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying || isLoading) {
      audioRef.current.pause();
      audioRef.current.src = '';
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const timestamp = Date.now();
      audioRef.current.src = `${STREAM_URL}?t=${timestamp}`;
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
        setIsLoading(false);
      });
    }
  }, [isPlaying, isLoading]);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        isLoading,
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
