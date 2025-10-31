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
            <div className="min-h-screen bg-background">
              <Header />
              <Router />
              <BottomPlayer />
            </div>
            <Toaster />
          </AudioPlayerProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
