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
  
  const primaryAudioRef = useRef<HTMLAudioElement | null>(null);
  const backupAudioRef = useRef<HTMLAudioElement | null>(null);
  const activeAudioRef = useRef<'primary' | 'backup'>('primary');
  
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const healthCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const preloadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const isPlayingRef = useRef(false);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 15;
  const isSwitchingRef = useRef(false);
  
  const [currentProgram, setCurrentProgram] = useState<CurrentProgram>({
    title: 'Ao Vivo - 87.9 FM',
    description: 'Aperte o Play FM',
    image: '',
  });

  const getStreamUrl = useCallback(() => {
    return `/api/stream?t=${Date.now()}`;
  }, []);

  const getActiveAudio = useCallback(() => {
    return activeAudioRef.current === 'primary' ? primaryAudioRef.current : backupAudioRef.current;
  }, []);

  const getBackupAudio = useCallback(() => {
    return activeAudioRef.current === 'primary' ? backupAudioRef.current : primaryAudioRef.current;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (healthCheckIntervalRef.current) {
      clearInterval(healthCheckIntervalRef.current);
      healthCheckIntervalRef.current = null;
    }
    if (preloadTimeoutRef.current) {
      clearTimeout(preloadTimeoutRef.current);
      preloadTimeoutRef.current = null;
    }
  }, []);

  const preloadBackupStream = useCallback(() => {
    if (!isPlayingRef.current) return;
    
    const backup = getBackupAudio();
    if (!backup) return;
    
    backup.src = getStreamUrl();
    backup.load();
    backup.volume = 0;
    
    backup.play().then(() => {
      backup.pause();
      console.log('Backup stream preloaded and ready');
    }).catch(() => {
      console.log('Backup preload failed, will retry');
    });
  }, [getBackupAudio, getStreamUrl]);

  const seamlessSwitch = useCallback(() => {
    if (isSwitchingRef.current || !isPlayingRef.current) return;
    
    isSwitchingRef.current = true;
    console.log('Performing seamless switch...');
    
    const currentActive = getActiveAudio();
    const backup = getBackupAudio();
    
    if (!backup || !currentActive) {
      isSwitchingRef.current = false;
      return;
    }
    
    backup.volume = 0;
    backup.src = getStreamUrl();
    
    backup.play().then(() => {
      let fadeStep = 0;
      const fadeInterval = setInterval(() => {
        fadeStep++;
        const progress = fadeStep / 10;
        
        if (currentActive) {
          currentActive.volume = Math.max(0, (volume / 100) * (1 - progress));
        }
        backup.volume = Math.min(volume / 100, (volume / 100) * progress);
        
        if (fadeStep >= 10) {
          clearInterval(fadeInterval);
          
          if (currentActive) {
            currentActive.pause();
            currentActive.src = '';
          }
          
          activeAudioRef.current = activeAudioRef.current === 'primary' ? 'backup' : 'primary';
          reconnectAttemptsRef.current = 0;
          isSwitchingRef.current = false;
          
          console.log('Seamless switch completed');
          
          preloadTimeoutRef.current = setTimeout(preloadBackupStream, 5000);
        }
      }, 50);
    }).catch(() => {
      console.log('Seamless switch failed, trying direct reconnect');
      isSwitchingRef.current = false;
      directReconnect();
    });
  }, [getActiveAudio, getBackupAudio, getStreamUrl, volume, preloadBackupStream]);

  const directReconnect = useCallback(() => {
    if (!isPlayingRef.current) return;
    
    if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
      console.log('Max reconnect attempts reached');
      setIsPlaying(false);
      isPlayingRef.current = false;
      reconnectAttemptsRef.current = 0;
      return;
    }
    
    reconnectAttemptsRef.current++;
    console.log(`Direct reconnect (attempt ${reconnectAttemptsRef.current})...`);
    
    const audio = getActiveAudio();
    if (!audio) return;
    
    audio.pause();
    audio.src = '';
    audio.load();
    audio.src = getStreamUrl();
    audio.volume = volume / 100;
    
    audio.play().catch(() => {
      const delay = Math.min(500 * Math.pow(1.5, reconnectAttemptsRef.current - 1), 5000);
      reconnectTimeoutRef.current = setTimeout(() => {
        if (reconnectAttemptsRef.current < 3) {
          directReconnect();
        } else {
          seamlessSwitch();
        }
      }, delay);
    });
  }, [getActiveAudio, getStreamUrl, volume, seamlessSwitch]);

  const startHealthCheck = useCallback(() => {
    if (healthCheckIntervalRef.current) {
      clearInterval(healthCheckIntervalRef.current);
    }
    
    healthCheckIntervalRef.current = setInterval(() => {
      if (!isPlayingRef.current) return;
      
      const audio = getActiveAudio();
      if (!audio) return;
      
      const buffered = audio.buffered;
      const currentTime = audio.currentTime;
      
      let bufferHealth = 0;
      if (buffered.length > 0) {
        bufferHealth = buffered.end(buffered.length - 1) - currentTime;
      }
      
      if (bufferHealth < 1 && audio.readyState < 3) {
        console.log('Buffer health low, preemptive switch');
        seamlessSwitch();
      }
      
      if (audio.paused && isPlayingRef.current && !isSwitchingRef.current) {
        console.log('Audio unexpectedly paused, recovering');
        audio.play().catch(() => seamlessSwitch());
      }
    }, 2000);
  }, [getActiveAudio, seamlessSwitch]);

  useEffect(() => {
    const primary = new Audio();
    const backup = new Audio();
    
    primary.volume = volume / 100;
    backup.volume = 0;
    primary.preload = 'auto';
    backup.preload = 'auto';
    
    const createHandlers = (audio: HTMLAudioElement, name: string) => {
      const handleError = () => {
        console.log(`${name} audio error`);
        if (isPlayingRef.current && !isSwitchingRef.current) {
          if (audio === getActiveAudio()) {
            seamlessSwitch();
          }
        }
      };
      
      const handleStalled = () => {
        console.log(`${name} audio stalled`);
        if (isPlayingRef.current && !isSwitchingRef.current && audio === getActiveAudio()) {
          reconnectTimeoutRef.current = setTimeout(() => {
            if (audio.readyState < 3) {
              seamlessSwitch();
            }
          }, 2000);
        }
      };
      
      const handleEnded = () => {
        console.log(`${name} audio ended`);
        if (isPlayingRef.current && !isSwitchingRef.current && audio === getActiveAudio()) {
          seamlessSwitch();
        }
      };
      
      const handlePlaying = () => {
        if (audio === getActiveAudio()) {
          console.log(`${name} audio playing`);
          reconnectAttemptsRef.current = 0;
          setIsLoading(false);
        }
      };
      
      const handleWaiting = () => {
        console.log(`${name} audio waiting`);
        if (isPlayingRef.current && !isSwitchingRef.current && audio === getActiveAudio()) {
          reconnectTimeoutRef.current = setTimeout(() => {
            if (isPlayingRef.current && audio.readyState < 3) {
              seamlessSwitch();
            }
          }, 3000);
        }
      };
      
      audio.addEventListener('error', handleError);
      audio.addEventListener('stalled', handleStalled);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('playing', handlePlaying);
      audio.addEventListener('waiting', handleWaiting);
      
      return () => {
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('stalled', handleStalled);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('playing', handlePlaying);
        audio.removeEventListener('waiting', handleWaiting);
      };
    };
    
    const cleanupPrimary = createHandlers(primary, 'Primary');
    const cleanupBackup = createHandlers(backup, 'Backup');
    
    primaryAudioRef.current = primary;
    backupAudioRef.current = backup;
    
    return () => {
      clearAllTimeouts();
      cleanupPrimary();
      cleanupBackup();
      
      primary.pause();
      primary.src = '';
      backup.pause();
      backup.src = '';
      
      primaryAudioRef.current = null;
      backupAudioRef.current = null;
    };
  }, [clearAllTimeouts, seamlessSwitch, getActiveAudio]);

  useEffect(() => {
    const primary = primaryAudioRef.current;
    const backup = backupAudioRef.current;
    
    if (primary && activeAudioRef.current === 'primary') {
      primary.volume = volume / 100;
    }
    if (backup && activeAudioRef.current === 'backup') {
      backup.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = useCallback(() => {
    const audio = getActiveAudio();
    if (!audio) return;

    if (isPlaying) {
      clearAllTimeouts();
      
      primaryAudioRef.current?.pause();
      backupAudioRef.current?.pause();
      
      if (primaryAudioRef.current) primaryAudioRef.current.src = '';
      if (backupAudioRef.current) backupAudioRef.current.src = '';
      
      setIsPlaying(false);
      setIsLoading(false);
      isPlayingRef.current = false;
      reconnectAttemptsRef.current = 0;
      isSwitchingRef.current = false;
    } else {
      setIsLoading(true);
      reconnectAttemptsRef.current = 0;
      
      audio.src = getStreamUrl();
      audio.volume = volume / 100;
      
      audio.play()
        .then(() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
          startHealthCheck();
          
          preloadTimeoutRef.current = setTimeout(preloadBackupStream, 3000);
        })
        .catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
          isPlayingRef.current = false;
        });
    }
  }, [isPlaying, getActiveAudio, getStreamUrl, volume, clearAllTimeouts, startHealthCheck, preloadBackupStream]);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    const audio = getActiveAudio();
    if (audio) {
      audio.volume = newVolume / 100;
    }
  }, [getActiveAudio]);

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
