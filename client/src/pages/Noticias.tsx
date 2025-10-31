import NewsCard from '@/components/NewsCard';
import newsImage from '@assets/generated_images/News_bulletin_backdrop_image_ad8d9119.png';
import eventImage from '@assets/generated_images/Community_event_coverage_photo_27c09e1a.png';
import newsBanner from '@assets/generated_images/Radio_news_studio_banner_41c80be3.png';

export default function Noticias() {
  const news = [
    {
      id: 1,
      title: 'Evento Comunitário Reúne Milhares de Pessoas',
      summary: 'A Aperte o Play FM organizou um evento especial que reuniu a comunidade local para celebrar a música e cultura.',
      image: eventImage,
      date: '28 de Outubro, 2025',
    },
    {
      id: 2,
      title: 'Nova Programação Musical Estreia na Próxima Semana',
      summary: 'Prepare-se para conhecer novos programas e apresentadores que vão agitar suas manhãs e tardes.',
      image: newsImage,
      date: '25 de Outubro, 2025',
    },
    {
      id: 3,
      title: 'Entrevista Exclusiva com Artista Local',
      summary: 'Confira os bastidores da entrevista com um dos maiores talentos da nossa região.',
      image: newsImage,
      date: '22 de Outubro, 2025',
    },
    {
      id: 4,
      title: 'Aperte o Play FM Completa 5 Anos no Ar',
      summary: 'Celebramos cinco anos levando alegria, música e informação para nossos ouvintes.',
      image: eventImage,
      date: '18 de Outubro, 2025',
    },
    {
      id: 5,
      title: 'Campanha de Doação Arrecada Toneladas de Alimentos',
      summary: 'Nossa campanha solidária superou as expectativas e ajudou centenas de famílias.',
      image: eventImage,
      date: '15 de Outubro, 2025',
    },
    {
      id: 6,
      title: 'Novos Equipamentos Melhoram Qualidade do Sinal',
      summary: 'Investimento em tecnologia garante melhor experiência para nossos ouvintes.',
      image: newsImage,
      date: '10 de Outubro, 2025',
    },
  ];

  return (
    <div className="min-h-screen pb-32">
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `url(${newsBanner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gradient-start/20 to-gradient-end/20" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20 sm:mt-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }} data-testid="text-news-title">
            Notícias
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }} data-testid="text-news-subtitle">
            Fique por dentro das últimas novidades
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-background/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article) => (
              <NewsCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
