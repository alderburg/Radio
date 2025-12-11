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
    const audio = new Audio();
    audio.volume = volume / 100;
    audio.crossOrigin = 'anonymous';
    
    audio.addEventListener('error', (e) => {
      const mediaError = audio.error;
      console.error('Audio error event:', e);
      console.error('MediaError code:', mediaError?.code);
      console.error('MediaError message:', mediaError?.message);
      console.error('Network state:', audio.networkState);
      console.error('Ready state:', audio.readyState);
      setIsPlaying(false);
    });
    
    audio.addEventListener('loadstart', () => {
      console.log('Audio loadstart - começando a carregar');
    });
    
    audio.addEventListener('loadeddata', () => {
      console.log('Audio loadeddata - dados carregados');
    });
    
    audio.addEventListener('canplay', () => {
      console.log('Audio canplay - pronto para tocar');
    });
    
    audio.addEventListener('playing', () => {
      console.log('Audio playing - reproduzindo');
    });
    
    audio.addEventListener('stalled', () => {
      console.log('Audio stalled - travou');
    });
    
    audio.addEventListener('waiting', () => {
      console.log('Audio waiting - esperando dados');
    });
    
    audioRef.current = audio;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) {
      console.log('AudioRef is null');
      return;
    }

    console.log('Toggle play called, isPlaying:', isPlaying);

    if (isPlaying) {
      console.log('Pausing audio...');
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const streamUrl = 'http://186.250.8.32:6750/stream';
      console.log('Setting audio source to:', streamUrl);
      audioRef.current.src = streamUrl;
      
      console.log('Attempting to play...');
      audioRef.current.play()
        .then(() => {
          console.log('Audio playback started successfully');
        })
        .catch(err => {
          console.error('Audio play error:', err);
          console.error('Error name:', err.name);
          console.error('Error message:', err.message);
          setIsPlaying(false);
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
