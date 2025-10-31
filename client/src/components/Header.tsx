import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import logoWhite from '/logo-aperte-play-white.png?url';
import logoColor from '/logo-aperte-play-color.png?url';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
        scrolled 
          ? 'bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 border-b border-indigo-500/30 shadow-[0_8px_32px_rgba(99,102,241,0.4),0_4px_16px_rgba(168,85,247,0.3)]' 
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      {scrolled && (
        <>
          {/* Borda inferior brilhante */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
          
          {/* Efeito de brilho animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent animate-[shimmer_4s_ease-in-out_infinite]" 
               style={{
                 backgroundSize: '200% 100%',
                 animation: 'shimmer 4s ease-in-out infinite'
               }} 
          />
          
          {/* Pontos de luz decorativos */}
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src={scrolled ? logoColor : logoWhite} 
              alt="Aperte o Play FM" 
              className="h-16 w-auto transition-opacity duration-300" 
              data-testid="img-logo" 
            />
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
            className={`lg:hidden hover-elevate active-elevate-2 rounded-md transition-colors duration-300 ${
              scrolled 
                ? 'bg-cyan-500 hover:bg-cyan-600' 
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 z-40">
          <div className="mx-4 my-2 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive(item.path) ? 'secondary' : 'ghost'}
                    className="w-full justify-start hover-elevate active-elevate-2 text-white"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}