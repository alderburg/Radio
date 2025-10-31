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
              {/* Camada de fundo com degradê roxo para azul */}
              <div 
                className="fixed inset-0 z-0"
                style={{
                  background: `linear-gradient(135deg, 
                    hsl(265, 70%, 12%) 0%, 
                    hsl(255, 75%, 14%) 15%,
                    hsl(245, 80%, 16%) 30%,
                    hsl(235, 75%, 15%) 45%,
                    hsl(225, 70%, 14%) 60%,
                    hsl(215, 65%, 13%) 75%,
                    hsl(210, 70%, 11%) 100%
                  )`
                }}
              />
              
              {/* Camada de efeitos radiais animados - roxo e azul */}
              <div 
                className="fixed z-0 animate-[gradient-shift_20s_ease-in-out_infinite]"
                style={{
                  top: '-10%',
                  left: '-10%',
                  right: '-10%',
                  bottom: '-10%',
                  background: `
                    radial-gradient(circle 800px at 20% 30%, hsla(270, 100%, 55%, 0.25) 0%, transparent 50%),
                    radial-gradient(circle 900px at 80% 25%, hsla(220, 100%, 55%, 0.28) 0%, transparent 55%),
                    radial-gradient(circle 700px at 15% 70%, hsla(260, 100%, 60%, 0.22) 0%, transparent 48%),
                    radial-gradient(circle 1000px at 85% 75%, hsla(210, 100%, 50%, 0.24) 0%, transparent 52%),
                    radial-gradient(ellipse 1300px 800px at 50% 50%, hsla(240, 100%, 45%, 0.16) 0%, transparent 60%)
                  `,
                  pointerEvents: 'none'
                }}
              />
              
              {/* Camada de brilho pulsante - transição roxo-azul */}
              <div 
                className="fixed inset-0 z-0 animate-[pulse-glow_6s_ease-in-out_infinite_alternate]"
                style={{
                  background: `
                    radial-gradient(circle 600px at 30% 40%, hsla(260, 100%, 60%, 0.15) 0%, transparent 55%),
                    radial-gradient(circle 650px at 70% 60%, hsla(220, 100%, 60%, 0.13) 0%, transparent 55%)
                  `,
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
