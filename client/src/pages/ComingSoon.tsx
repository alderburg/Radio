import { Radio, Clock, Sparkles, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export default function ComingSoon() {
  const { installApp } = usePWAInstall();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 pb-24 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-600/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4 md:mb-6">
            <img
              src="/logo-aperte-play-color.png"
              alt="Aperte o Play FM"
              className="h-20 md:h-32 w-auto"
            />
          </div>

          <div className="inline-flex items-center gap-2 bg-purple-600/20 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-purple-500/30 mb-4 md:mb-6">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-purple-400" />
            <span className="text-xs md:text-sm font-semibold text-purple-300">NOVIDADE</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent px-2">
            Novo Site em Breve!
          </h1>

          <p className="text-base md:text-xl text-slate-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Estamos preparando uma experiência incrível para você! 
            Enquanto isso, curta nossa programação ao vivo.
          </p>

          <div className="flex flex-row items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="flex items-center gap-2 text-purple-400">
              <Radio className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-semibold text-sm md:text-base">87.9 MHz</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-slate-600"></div>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs md:text-sm">24h no ar</span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-900/30 border-slate-700/30 backdrop-blur-sm p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600/20 rounded-full mb-3">
              <Radio className="h-6 w-6 text-purple-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Transmissão ao Vivo</h4>
            <p className="text-sm text-slate-400">Ouça nossa rádio 24 horas por dia, 7 dias por semana</p>
          </Card>

          <Card 
            className="bg-slate-900/30 border-slate-700/30 backdrop-blur-sm p-6 text-center cursor-pointer hover:bg-slate-800/40 transition-colors"
            onClick={installApp}
            data-testid="card-install-app"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600/20 rounded-full mb-3">
              <Download className="h-6 w-6 text-purple-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Instalar App</h4>
            <p className="text-sm text-slate-400">Clique aqui para instalar o app no seu celular</p>
          </Card>

          <Card className="bg-slate-900/30 border-slate-700/30 backdrop-blur-sm p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600/20 rounded-full mb-3">
              <Clock className="h-6 w-6 text-green-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Programação Completa</h4>
            <p className="text-sm text-slate-400">Confira todos os nossos programas em breve</p>
          </Card>
        </div>

        <div className="mt-6 md:mt-8 text-center pb-8 md:pb-4">
          <p className="text-slate-400 text-xs md:text-sm mb-4">
            Acompanhe nossas redes sociais para ficar por dentro das novidades
          </p>
          <div className="flex flex-row justify-center items-center gap-3 md:gap-4 mb-6">
            <a
              href="https://www.instagram.com/aperteoplayfm/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors text-sm md:text-base"
              data-testid="link-instagram"
            >
              Instagram
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="https://www.facebook.com/people/Aperte-O-Play/100094220708639/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm md:text-base"
              data-testid="link-facebook"
            >
              Facebook
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="https://www.youtube.com/@aperteoplayfm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 transition-colors text-sm md:text-base"
              data-testid="link-youtube"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}