import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProgramCard from '@/components/ProgramCard';
import morningShowImage from '@assets/generated_images/Morning_show_concept_art_cd87e2ef.png';
import eveningShowImage from '@assets/generated_images/Evening_music_show_concept_91eff014.png';
import nightShowImage from '@assets/generated_images/Night_talk_show_setup_5b9e5b4a.png';

export default function Programacao() {
  const [selectedDay, setSelectedDay] = useState('Segunda');

  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const programs = {
    'Segunda': [
      { title: 'Café da Manhã', time: '07:00', description: 'Comece o dia com energia!', image: morningShowImage },
      { title: 'Ritmos da Tarde', time: '14:00', description: 'Música para sua tarde.', image: eveningShowImage },
      { title: 'Papo Noturno', time: '22:00', description: 'Conversas profundas.', image: nightShowImage },
    ],
    'Terça': [
      { title: 'Café da Manhã', time: '07:00', description: 'Comece o dia com energia!', image: morningShowImage },
      { title: 'Rock da Tarde', time: '15:00', description: 'Os melhores rocks.', image: eveningShowImage },
      { title: 'Jazz Night', time: '23:00', description: 'Noite de jazz.', image: nightShowImage },
    ],
    'Quarta': [
      { title: 'Café da Manhã', time: '07:00', description: 'Comece o dia com energia!', image: morningShowImage },
      { title: 'Pop Hits', time: '16:00', description: 'Os sucessos do momento.', image: eveningShowImage },
      { title: 'Papo Noturno', time: '22:00', description: 'Conversas profundas.', image: nightShowImage },
    ],
    'Quinta': [
      { title: 'Café da Manhã', time: '07:00', description: 'Comece o dia com energia!', image: morningShowImage },
      { title: 'Sertanejo', time: '17:00', description: 'O melhor do sertanejo.', image: eveningShowImage },
      { title: 'Papo Noturno', time: '22:00', description: 'Conversas profundas.', image: nightShowImage },
    ],
    'Sexta': [
      { title: 'Café da Manhã', time: '07:00', description: 'Comece o dia com energia!', image: morningShowImage },
      { title: 'Esquenta Sexta', time: '18:00', description: 'Preparando o fim de semana.', image: eveningShowImage },
      { title: 'Night Club', time: '23:00', description: 'Balada na rádio.', image: nightShowImage },
    ],
    'Sábado': [
      { title: 'Manhã de Sábado', time: '08:00', description: 'Relaxe no fim de semana.', image: morningShowImage },
      { title: 'Show de Talentos', time: '16:00', description: 'Artistas locais.', image: eveningShowImage },
      { title: 'Baladão', time: '21:00', description: 'A festa continua.', image: nightShowImage },
    ],
    'Domingo': [
      { title: 'Domingo Tranquilo', time: '09:00', description: 'Música relaxante.', image: morningShowImage },
      { title: 'MPB da Tarde', time: '15:00', description: 'A melhor MPB.', image: eveningShowImage },
      { title: 'Clássicos', time: '20:00', description: 'Músicas atemporais.', image: nightShowImage },
    ],
  };

  return (
    <div className="min-h-screen pb-32 pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8" data-testid="text-schedule-title">Programação</h1>

        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max justify-center pb-4">
            {days.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? 'default' : 'outline'}
                onClick={() => setSelectedDay(day)}
                className="hover-elevate active-elevate-2"
                data-testid={`button-day-${day.toLowerCase()}`}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs[selectedDay as keyof typeof programs].map((program, index) => (
            <div
              key={`${selectedDay}-${index}`}
              className="animate-in fade-in duration-500"
            >
              <ProgramCard {...program} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
