import BottomPlayer from '../BottomPlayer';
import { AudioPlayerProvider } from '@/contexts/AudioPlayerContext';

export default function BottomPlayerExample() {
  return (
    <AudioPlayerProvider>
      <BottomPlayer />
    </AudioPlayerProvider>
  );
}
