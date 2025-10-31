import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Radio } from 'lucide-react';
import supporterImage from '@assets/generated_images/Supporter_logo_placeholder_5f468ddb.png';
import liveBanner from '@assets/generated_images/Live_broadcast_studio_banner_c0041e9a.png';

export default function AoVivo() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const supporters = [
    { id: 1, image: supporterImage, name: 'Apoiador 1' },
    { id: 2, image: supporterImage, name: 'Apoiador 2' },
    { id: 3, image: supporterImage, name: 'Apoiador 3' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % supporters.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [supporters.length]);

  return (
    <div className="min-h-screen pb-32">
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `url(${liveBanner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gradient-start/20 to-gradient-end/20" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20 sm:mt-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }} data-testid="text-live-title">
            Transmissão Ao Vivo
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }} data-testid="text-live-subtitle">
            Assista e ouça nossa programação em tempo real
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <Card className="overflow-hidden">
                <div className="aspect-video bg-black flex items-center justify-center">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/jfKfPfyJRdk"
                    title="YouTube Live Stream"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    data-testid="iframe-youtube"
                  />
                </div>
              </Card>
            </div>

            <div>
              <Card className="overflow-hidden h-full">
                <div className="aspect-square relative">
                  {supporters.map((supporter, index) => (
                    <div
                      key={supporter.id}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={supporter.image}
                        alt={supporter.name}
                        className="w-full h-full object-contain p-8"
                        data-testid={`img-supporter-${supporter.id}`}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-gradient-start/10 to-gradient-end/10 border-primary/20">
            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <Radio className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold" data-testid="text-tune-in">Sintonize 87.9 FM</h2>
              </div>
              <p className="text-lg text-muted-foreground" data-testid="text-tune-subtitle">
                e ouça ao vivo agora mesmo!
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
