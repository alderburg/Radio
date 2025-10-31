import { Link } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface NewsCardProps {
  id: number;
  title: string;
  summary: string;
  image: string;
  date: string;
}

export default function NewsCard({ id, title, summary, image, date }: NewsCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-transform duration-300 hover:scale-105" data-testid={`card-news-${id}`}>
      <div className="aspect-video relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" data-testid="img-news" />
      </div>
      <div className="p-6">
        <p className="text-xs text-muted-foreground mb-2" data-testid="text-news-date">{date}</p>
        <h3 className="text-xl font-bold mb-3" data-testid="text-news-title">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4" data-testid="text-news-summary">{summary}</p>
        <Link href={`/noticia/${id}`}>
          <Button variant="ghost" className="group hover-elevate active-elevate-2" data-testid="button-read-more">
            Ler mais
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
