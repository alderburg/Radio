import Header from '../Header';
import { AudioPlayerProvider } from '@/contexts/AudioPlayerContext';

export default function HeaderExample() {
  return (
    <AudioPlayerProvider>
      <Header />
    </AudioPlayerProvider>
  );
}
