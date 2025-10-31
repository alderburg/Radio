import { Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import defaultProgramImage from '@assets/5_1761918394755.png';

export default function BottomPlayer() {
  const { isPlaying, volume, currentProgram, togglePlay, setVolume } = useAudioPlayer();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-indigo-950/95 via-purple-900/92 to-blue-900/88 backdrop-blur-xl border-t border-purple-400/40 shadow-[0_-4px_30px_rgba(99,102,241,0.25),0_-2px_15px_rgba(168,85,247,0.2)] overflow-hidden">
      {/* Efeito de brilho animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" 
           style={{
             backgroundSize: '200% 100%',
             animation: 'shimmer 3s ease-in-out infinite'
           }} 
      />
      
      {/* Pontos de luz decorativos */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img
              src={currentProgram.image || defaultProgramImage}
              alt={currentProgram.title}
              className="w-14 h-14 rounded-md object-cover"
              data-testid="img-current-program"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate" data-testid="text-program-title">
                {currentProgram.title}
              </h3>
              <p className="text-xs text-muted-foreground truncate" data-testid="text-program-description">
                {currentProgram.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              size="icon"
              onClick={togglePlay}
              className="hover-elevate active-elevate-2"
              data-testid="button-player-toggle"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <div className="hidden sm:flex items-center gap-2 w-32">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={1}
                className="flex-1"
                data-testid="slider-player-volume"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
