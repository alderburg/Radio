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

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(70);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(false);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 15;
  const volumeRef = useRef(70);
  
  const [currentProgram, setCurrentProgram] = useState<CurrentProgram>({
    title: 'Ao Vivo - 87.9 FM',
    description: 'Aperte o Play FM',
    image: '',
  });

  const clearReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const getStreamUrl = useCallback(() => {
    return `/api/stream?t=${Date.now()}`;
  }, []);

  const reconnectStream = useCallback(() => {
    if (!audioRef.current || !isPlayingRef.current) return;
    
    if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
      console.log('Max reconnect attempts reached');
      setIsPlaying(false);
      isPlayingRef.current = false;
      reconnectAttemptsRef.current = 0;
      return;
    }

    reconnectAttemptsRef.current++;
    console.log(`Reconnecting stream (attempt ${reconnectAttemptsRef.current})...`);
    
    const audio = audioRef.current;
    const currentVolume = volumeRef.current;
    
    audio.pause();
    audio.src = '';
    audio.load();
    
    audio.src = getStreamUrl();
    audio.volume = currentVolume / 100;
    
    audio.play().catch(() => {
      const delay = Math.min(1000 * Math.pow(1.5, reconnectAttemptsRef.current - 1), 8000);
      reconnectTimeoutRef.current = setTimeout(reconnectStream, delay);
    });
  }, [getStreamUrl]);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = volumeRef.current / 100;
    audio.preload = 'none';
    
    const handleError = () => {
      console.log('Audio error occurred');
      if (isPlayingRef.current) {
        clearReconnectTimeout();
        reconnectTimeoutRef.current = setTimeout(reconnectStream, 1500);
      }
    };
    
    const handleStalled = () => {
      console.log('Audio stalled');
      if (isPlayingRef.current) {
        clearReconnectTimeout();
        reconnectTimeoutRef.current = setTimeout(reconnectStream, 2000);
      }
    };
    
    const handleEnded = () => {
      console.log('Audio ended');
      if (isPlayingRef.current) {
        clearReconnectTimeout();
        reconnectTimeoutRef.current = setTimeout(reconnectStream, 500);
      }
    };

    const handlePlaying = () => {
      console.log('Audio playing');
      reconnectAttemptsRef.current = 0;
      setIsLoading(false);
      clearReconnectTimeout();
    };

    const handleWaiting = () => {
      console.log('Audio waiting for data');
      if (isPlayingRef.current) {
        clearReconnectTimeout();
        reconnectTimeoutRef.current = setTimeout(() => {
          if (isPlayingRef.current && audio.readyState < 3) {
            reconnectStream();
          }
        }, 10000);
      }
    };

    const handleCanPlay = () => {
      console.log('Audio can play');
      setIsLoading(false);
    };
    
    audio.addEventListener('error', handleError);
    audio.addEventListener('stalled', handleStalled);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    
    audioRef.current = audio;
    
    return () => {
      clearReconnectTimeout();
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('stalled', handleStalled);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [clearReconnectTimeout, reconnectStream]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      clearReconnectTimeout();
      audioRef.current.pause();
      audioRef.current.src = '';
      setIsPlaying(false);
      setIsLoading(false);
      isPlayingRef.current = false;
      reconnectAttemptsRef.current = 0;
    } else {
      setIsLoading(true);
      reconnectAttemptsRef.current = 0;
      audioRef.current.src = getStreamUrl();
      audioRef.current.volume = volumeRef.current / 100;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
        })
        .catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
          isPlayingRef.current = false;
        });
    }
  }, [isPlaying, clearReconnectTimeout, getStreamUrl]);

  const setVolume = useCallback((newVolume: number) => {
    volumeRef.current = newVolume;
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
