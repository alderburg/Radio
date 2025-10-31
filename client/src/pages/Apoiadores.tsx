import { Card } from '@/components/ui/card';
import supporterImage from '@assets/generated_images/Supporter_logo_placeholder_5f468ddb.png';

export default function Apoiadores() {
  const supporters = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Apoiador ${i + 1}`,
    image: supporterImage,
  }));

  return (
    <div className="min-h-screen pb-32 pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-supporters-title">Nossos Apoiadores</h1>
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
    </div>
  );
}
