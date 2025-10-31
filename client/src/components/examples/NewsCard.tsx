import NewsCard from '../NewsCard';
import newsImage from '@assets/generated_images/News_bulletin_backdrop_image_ad8d9119.png';

export default function NewsCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <NewsCard
        id={1}
        title="Evento Comunitário Reúne Milhares de Pessoas"
        summary="A Aperte o Play FM organizou um evento especial que reuniu a comunidade local para celebrar a música e cultura."
        image={newsImage}
        date="28 de Outubro, 2025"
      />
    </div>
  );
}
