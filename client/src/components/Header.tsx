
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { isPlaying, volume, togglePlay, setVolume } = useAudioPlayer();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/ao-vivo', label: 'Ao Vivo' },
    { path: '/programacao', label: 'Programação' },
    { path: '/apoiadores', label: 'Apoiadores' },
    { path: '/noticias', label: 'Notícias' },
    { path: '/apoie', label: 'Apoie' },
    { path: '/login', label: 'Login' },
  ];

  const isActive = (path: string) => location === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-lg' 
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <img src="logo-aperte-play.png" alt="Aperte o Play FM" className="h-16 w-auto" data-testid="img-logo" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={isActive(item.path) ? 'secondary' : 'ghost'}
                  className="hover-elevate active-elevate-2"
                  data-testid={`link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={togglePlay}
              className="hover-elevate active-elevate-2"
              data-testid="button-mini-player-toggle"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover-elevate active-elevate-2"
                  data-testid="button-volume-toggle"
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  <Slider
                    value={[volume]}
                    onValueChange={(value) => setVolume(value[0])}
                    max={100}
                    step={1}
                    className="flex-1"
                    data-testid="slider-volume"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden hover-elevate active-elevate-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden">
          <nav className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={isActive(item.path) ? 'secondary' : 'ghost'}
                  className="w-full justify-start hover-elevate active-elevate-2"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
