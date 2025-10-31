import { Switch, Route, Redirect, useLocation } from "wouter";
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
import ComingSoon from "@/pages/ComingSoon";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/em-breve" component={ComingSoon} />
      <Route path="/" component={() => <Redirect to="/em-breve" />} />
      <Route path="/home-completa" component={Home} />
      <Route path="/ao-vivo" component={() => <Redirect to="/em-breve" />} />
      <Route path="/programacao" component={() => <Redirect to="/em-breve" />} />
      <Route path="/apoiadores" component={() => <Redirect to="/em-breve" />} />
      <Route path="/noticias" component={() => <Redirect to="/em-breve" />} />
      <Route path="/noticia/:id" component={() => <Redirect to="/em-breve" />} />
      <Route path="/apoie" component={() => <Redirect to="/em-breve" />} />
      <Route path="/login" component={() => <Redirect to="/em-breve" />} />
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
            <ComingSoonLayout />
            <Toaster />
          </AudioPlayerProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function ComingSoonLayout() {
  const [location] = useLocation();
  const isComingSoonPage = location === '/em-breve' || location === '/';

  if (isComingSoonPage) {
    return (
      <div className="min-h-screen relative">
        <Router />
        <BottomPlayer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Camada base com gradiente */}
      <div 
        className="fixed inset-0 z-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900"
      />
      
      {/* Pontos de luz decorativos */}
      <div className="fixed inset-0 z-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
      
      {/* Efeito de brilho animado */}
      <div 
        className="fixed inset-0 z-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent animate-[shimmer_8s_ease-in-out_infinite]"
        style={{
          backgroundSize: '200% 100%',
          animation: 'shimmer 8s ease-in-out infinite',
          pointerEvents: 'none'
        }} 
      />
      
      {/* Camada de textura granulada */}
      <div 
        className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
                            radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.02) 1px, transparent 1px)`,
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
  );
}

export default App;
