import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AudioPlayerProvider } from "@/contexts/AudioPlayerContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import BottomPlayer from "@/components/BottomPlayer";
import Home from "@/pages/Home";
import AoVivo from "@/pages/AoVivo";
import Programacao from "@/pages/Programacao";
import Apoiadores from "@/pages/Apoiadores";
import Noticias from "@/pages/Noticias";
import NoticiaDetalhe from "@/pages/NoticiaDetalhe";
import Apoie from "@/pages/Apoie";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ao-vivo" component={AoVivo} />
      <Route path="/programacao" component={Programacao} />
      <Route path="/apoiadores" component={Apoiadores} />
      <Route path="/noticias" component={Noticias} />
      <Route path="/noticia/:id" component={NoticiaDetalhe} />
      <Route path="/apoie" component={Apoie} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AudioPlayerProvider>
            <div className="min-h-screen relative">
              {/* Camada base com degradê diagonal ciano/magenta escuro */}
              <div 
                className="fixed inset-0 z-0"
                style={{
                  background: `linear-gradient(135deg, 
                    #0a0d1f 0%,
                    #0d1628 15%,
                    #111a35 30%,
                    #0f1832 50%,
                    #14182e 70%,
                    #0e1229 85%,
                    #0a0e1f 100%
                  )`
                }}
              />
              
              {/* Camada de halos coloridos - ciano e magenta */}
              <div 
                className="fixed z-0 animate-[gradient-shift_20s_ease-in-out_infinite]"
                style={{
                  top: '-10%',
                  left: '-10%',
                  right: '-10%',
                  bottom: '-10%',
                  background: `
                    radial-gradient(circle 900px at 15% 20%, rgba(0, 212, 255, 0.08) 0%, transparent 50%),
                    radial-gradient(circle 1100px at 85% 30%, rgba(255, 0, 255, 0.12) 0%, transparent 55%),
                    radial-gradient(circle 800px at 25% 80%, rgba(0, 212, 255, 0.06) 0%, transparent 48%),
                    radial-gradient(circle 950px at 75% 75%, rgba(255, 0, 255, 0.09) 0%, transparent 52%)
                  `,
                  pointerEvents: 'none'
                }}
              />
              
              {/* Camada de brilho sutil pulsante */}
              <div 
                className="fixed inset-0 z-0 animate-[pulse-glow_8s_ease-in-out_infinite_alternate]"
                style={{
                  background: `
                    radial-gradient(circle 700px at 40% 35%, rgba(0, 212, 255, 0.05) 0%, transparent 60%),
                    radial-gradient(circle 750px at 60% 65%, rgba(255, 0, 255, 0.07) 0%, transparent 60%)
                  `,
                  pointerEvents: 'none'
                }}
              />
              
              {/* Camada de textura granulada */}
              <div 
                className="fixed inset-0 z-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
                                    radial-gradient(circle at 75% 75%, rgba(0, 212, 255, 0.02) 1px, transparent 1px)`,
                  backgroundSize: '50px 50px',
                  pointerEvents: 'none'
                }}
              />
              
              {/* Conteúdo da aplicação */}
              <div className="relative z-10">
                <Header />
                <Router />
                <BottomPlayer />
              </div>
            </div>
            <Toaster />
          </AudioPlayerProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
