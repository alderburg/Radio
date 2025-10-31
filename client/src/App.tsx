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
              {/* Camada de fundo com degradê - sempre visível */}
              <div 
                className="fixed inset-0 z-0"
                style={{
                  background: `linear-gradient(135deg, 
                    hsl(265, 70%, 12%) 0%, 
                    hsl(280, 75%, 15%) 20%,
                    hsl(290, 80%, 13%) 40%,
                    hsl(275, 75%, 14%) 60%,
                    hsl(285, 70%, 12%) 80%,
                    hsl(270, 75%, 11%) 100%
                  )`
                }}
              />
              
              {/* Camada de efeitos radiais animados */}
              <div 
                className="fixed z-0 animate-[gradient-shift_20s_ease-in-out_infinite]"
                style={{
                  top: '-10%',
                  left: '-10%',
                  right: '-10%',
                  bottom: '-10%',
                  background: `
                    radial-gradient(circle 700px at 20% 25%, hsla(300, 100%, 50%, 0.30) 0%, transparent 45%),
                    radial-gradient(circle 900px at 80% 20%, hsla(270, 100%, 45%, 0.35) 0%, transparent 50%),
                    radial-gradient(circle 800px at 15% 75%, hsla(285, 100%, 55%, 0.25) 0%, transparent 45%),
                    radial-gradient(circle 1000px at 85% 80%, hsla(295, 100%, 50%, 0.22) 0%, transparent 50%),
                    radial-gradient(ellipse 1400px 900px at 50% 50%, hsla(280, 100%, 40%, 0.15) 0%, transparent 65%)
                  `,
                  pointerEvents: 'none'
                }}
              />
              
              {/* Camada de brilho pulsante */}
              <div 
                className="fixed inset-0 z-0 animate-[pulse-glow_6s_ease-in-out_infinite_alternate]"
                style={{
                  background: `
                    radial-gradient(circle 500px at 35% 45%, hsla(290, 100%, 60%, 0.12) 0%, transparent 50%),
                    radial-gradient(circle 600px at 65% 55%, hsla(275, 100%, 65%, 0.10) 0%, transparent 50%)
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
