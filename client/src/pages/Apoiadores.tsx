import { Card } from '@/components/ui/card';
import supporterImage from '@assets/generated_images/Supporter_logo_placeholder_5f468ddb.png';
import supportersBanner from '@assets/generated_images/Supporters_partnership_celebration_banner_30933a59.png';

export default function Apoiadores() {
  const supporters = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Apoiador ${i + 1}`,
    image: supporterImage,
  }));

  return (
    <div className="min-h-screen pb-32">
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `url(${supportersBanner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gradient-start/20 to-gradient-end/20" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20 sm:mt-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }} data-testid="text-supporters-title">
            Nossos Apoiadores
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }} data-testid="text-supporters-subtitle">
            Parceiros que fazem a diferença
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-supporters-thanks">
              Agradecemos imensamente a todos os nossos apoiadores que tornam possível manter a Aperte o Play FM no ar, 
              levando música e informação de qualidade para você!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {supporters.map((supporter, index) => (
              <Card
                key={supporter.id}
                className="p-6 hover-elevate transition-all duration-300"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeIn 0.5s ease-out forwards',
                }}
                data-testid={`card-supporter-${supporter.id}`}
              >
                <img
                  src={supporter.image}
                  alt={supporter.name}
                  className="w-full h-32 object-contain"
                  data-testid="img-supporter-logo"
                />
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
