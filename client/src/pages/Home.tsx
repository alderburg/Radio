import { Button } from '@/components/ui/button';
import ProgramCard from '@/components/ProgramCard';
import { Radio } from 'lucide-react';
import { Link } from 'wouter';
import heroImage from '@assets/generated_images/Radio_DJ_studio_portrait_4a97fc19.png';
import morningShowImage from '@assets/generated_images/Morning_show_concept_art_cd87e2ef.png';
import eveningShowImage from '@assets/generated_images/Evening_music_show_concept_91eff014.png';
import nightShowImage from '@assets/generated_images/Night_talk_show_setup_5b9e5b4a.png';

export default function Home() {
  const featuredPrograms = [
    {
      title: 'Café da Manhã',
      time: '07:00',
      description: 'Comece o dia com energia, boa música e as melhores notícias!',
      image: morningShowImage,
    },
    {
      title: 'Ritmos da Noite',
      time: '19:00',
      description: 'A melhor seleção musical para embalar sua noite.',
      image: eveningShowImage,
    },
    {
      title: 'Papo Noturno',
      time: '22:00',
      description: 'Conversas profundas e reflexivas para fechar o dia.',
      image: nightShowImage,
    },
  ];

  return (
    <div className="min-h-screen pb-32">
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gradient-start/20 to-gradient-end/20" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 whitespace-nowrap" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }} data-testid="text-hero-title">
            Aperte o Play FM
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white mb-8" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }} data-testid="text-hero-subtitle">
            A Rádio que Conecta Você!
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <Radio className="h-5 w-5 text-white" />
              <span className="text-2xl font-bold text-white" data-testid="text-frequency">87.9 MHz</span>
            </div>
            <Link href="/ao-vivo">
              <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 flex items-center gap-2" data-testid="button-listen-live">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Ouça Ao Vivo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12" data-testid="text-featured-title">Destaques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrograms.map((program) => (
              <ProgramCard key={program.title} {...program} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6" data-testid="text-about-title">Sobre Nós</h2>
          <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-content">
            A Aperte o Play FM 87.9 é mais do que uma rádio - somos uma comunidade que conecta pessoas através da música, 
            informação e entretenimento de qualidade. Com uma programação diversificada e apresentadores apaixonados, 
            estamos no ar 24 horas por dia para ser sua companhia constante.
          </p>
          <Button variant="outline" size="lg" className="hover-elevate active-elevate-2" data-testid="button-listen-now">
            Sintonize Agora
          </Button>
        </div>
      </section>
    </div>
  );
}
