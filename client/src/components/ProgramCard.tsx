import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface ProgramCardProps {
  title: string;
  time: string;
  description: string;
  image: string;
}

export default function ProgramCard({ title, time, description, image }: ProgramCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-transform duration-300 hover:scale-105 h-full flex flex-col" data-testid={`card-program-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="aspect-video relative overflow-hidden flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" data-testid="img-program" />
        <div className="absolute top-3 left-3">
          <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span data-testid="text-program-time">{time}</span>
          </div>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2" data-testid="text-program-name">{title}</h3>
        <p className="text-sm text-muted-foreground flex-1" data-testid="text-program-desc">{description}</p>
      </div>
    </Card>
  );
}
