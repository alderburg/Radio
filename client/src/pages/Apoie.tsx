import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import qrCodeImage from '@assets/generated_images/QR_code_donation_graphic_9e4aa183.png';
import supportBanner from '@assets/generated_images/Donation_support_campaign_banner_2a86c0d7.png';

export default function Apoie() {
  return (
    <div className="min-h-screen pb-32">
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `url(${supportBanner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gradient-start/20 to-gradient-end/20" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20 sm:mt-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }} data-testid="text-support-banner-title">
            Apoie a Rádio
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }} data-testid="text-support-banner-subtitle">
            Sua contribuição mantém a música tocando
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-gradient-start/5 to-gradient-end/5 border-primary/20 p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4" data-testid="text-support-title">
              Ajude a manter a Aperte o Play FM no ar
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-support-description">
              Sua contribuição é essencial para continuarmos levando música, informação e entretenimento de qualidade. 
              A Aperte o Play FM é mantida pelo apoio da comunidade que acredita no poder da comunicação local.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Formas de Apoiar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <Card key={index} className="p-6" data-testid={`card-qr-${index}`}>
                  <img
                    src={qrCodeImage}
                    alt={`QR Code ${index}`}
                    className="w-full aspect-square object-cover rounded-lg mb-3"
                    data-testid="img-qr-code"
                  />
                  <p className="text-sm text-center text-muted-foreground">
                    Opção {index}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" className="hover-elevate active-elevate-2" data-testid="button-support-now">
              <Heart className="mr-2 h-5 w-5" />
              Quero Apoiar Agora
            </Button>
          </div>

          <div className="mt-8 p-6 bg-card rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              Toda contribuição, independente do valor, faz diferença e nos ajuda a continuar nossa missão. 
              Agradecemos de coração pelo seu apoio!
            </p>
          </div>
        </Card>
        </div>
      </section>
    </div>
  );
}
