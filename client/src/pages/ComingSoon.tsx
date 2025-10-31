import { useEffect, useRef, useState } from 'react';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Radio, Calendar, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import logoColor from '/logo-aperte-play-color.png?url';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function ComingSoon() {
  const { isPlaying, togglePlay } = useAudioPlayer();
  const [player, setPlayer] = useState<any>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const ytPlayer = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: 'dQw4w9WgXcQ',
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
      setPlayer(ytPlayer);
    };

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setVideoPlaying(true);
      if (isPlaying) {
        togglePlay();
      }
    } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
      setVideoPlaying(false);
    }
  };

  useEffect(() => {
    if (isPlaying && videoPlaying && player) {
      player.pauseVideo();
      setVideoPlaying(false);
    }
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 pb-24 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-600/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-6">
            <motion.img
              src={logoColor}
              alt="Aperte o Play FM"
              className="h-32 w-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 bg-purple-600/20 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/30 mb-6"
          >
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">NOVIDADE</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Novo Site em Breve!
          </motion.h1>

          <motion.p
            className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Estamos preparando uma experiência incrível para você! 
            Enquanto isso, curta nossa programação ao vivo.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="flex items-center gap-2 text-purple-400">
              <Radio className="h-5 w-5" />
              <span className="font-semibold">87.9 MHz</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-slate-600"></div>
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Lançamento em breve</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-slate-600"></div>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="h-5 w-5" />
              <span className="text-sm">24h no ar</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-center text-white">
                Assista Nossa Programação
              </h3>
              <div className="aspect-video bg-black rounded-lg overflow-hidden" ref={playerRef}>
                <div id="youtube-player"></div>
              </div>
              <p className="text-sm text-slate-400 text-center mt-4">
                {videoPlaying ? '▶ Vídeo reproduzindo' : 'Clique para assistir'}
                {isPlaying && ' | 🎵 Áudio da rádio tocando'}
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <Card className="bg-slate-900/30 border-slate-700/30 backdrop-blur-sm p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600/20 rounded-full mb-3">
              <Radio className="h-6 w-6 text-purple-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Transmissão ao Vivo</h4>
            <p className="text-sm text-slate-400">Ouça nossa rádio 24 horas por dia, 7 dias por semana</p>
          </Card>

          <Card className="bg-slate-900/30 border-slate-700/30 backdrop-blur-sm p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-full mb-3">
              <Sparkles className="h-6 w-6 text-blue-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Nova Interface</h4>
            <p className="text-sm text-slate-400">Design moderno e navegação intuitiva em breve</p>
          </Card>

          <Card className="bg-slate-900/30 border-slate-700/30 backdrop-blur-sm p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600/20 rounded-full mb-3">
              <Clock className="h-6 w-6 text-green-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Programação Completa</h4>
            <p className="text-sm text-slate-400">Confira todos os nossos programas em breve</p>
          </Card>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <p className="text-slate-400 text-sm mb-4">
            Acompanhe nossas redes sociais para ficar por dentro das novidades
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.instagram.com/aperteoplayfm/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Instagram
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="https://www.facebook.com/people/Aperte-O-Play/100094220708639/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Facebook
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="https://www.youtube.com/@aperteoplayfm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              YouTube
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
