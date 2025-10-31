import { useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import eventImage from '@assets/generated_images/Community_event_coverage_photo_27c09e1a.png';

export default function NoticiaDetalhe() {
  const [, params] = useRoute('/noticia/:id');
  
  const article = {
    title: 'Evento Comunitário Reúne Milhares de Pessoas',
    date: '28 de Outubro, 2025',
    image: eventImage,
    content: `
      A Aperte o Play FM organizou no último sábado um evento especial que reuniu a comunidade local 
      para celebrar a música e a cultura regional. O evento contou com a presença de mais de 5 mil pessoas 
      e apresentações de artistas locais.

      A programação incluiu shows ao vivo, food trucks, atividades para crianças e sorteios de prêmios. 
      Os apresentadores da rádio estiveram presentes interagindo com o público e comandando as atrações.

      "Foi um sucesso absoluto", comentou o diretor da emissora. "Eventos como este reforçam nosso 
      compromisso com a comunidade e mostram a força que a rádio tem em conectar pessoas."

      O próximo evento está previsto para acontecer no final do ano, com uma programação ainda maior 
      e mais atrações. Fique ligado na 87.9 FM para não perder nenhuma novidade!
    `,
  };

  return (
    <div className="min-h-screen pb-32 pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/noticias">
          <Button variant="ghost" className="mb-6 hover-elevate active-elevate-2" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Notícias
          </Button>
        </Link>

        <article>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-4" data-testid="text-article-date">{article.date}</p>
            <h1 className="text-4xl font-bold mb-6" data-testid="text-article-title">{article.title}</h1>
          </div>

          <img
            src={article.image}
            alt={article.title}
            className="w-full rounded-xl mb-8"
            data-testid="img-article"
          />

          <div className="prose prose-lg max-w-none" data-testid="text-article-content">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-foreground/90">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
