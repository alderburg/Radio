import ProgramCard from '../ProgramCard';
import morningShowImage from '@assets/generated_images/Morning_show_concept_art_cd87e2ef.png';

export default function ProgramCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <ProgramCard
        title="Café da Manhã"
        time="07:00"
        description="Comece o dia com energia, boa música e as melhores notícias!"
        image={morningShowImage}
      />
    </div>
  );
}
