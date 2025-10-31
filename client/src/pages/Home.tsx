import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProgramCard from '@/components/ProgramCard';
import { Radio, ChevronLeft, ChevronRight, Play, Heart, Mail, Phone, MapPin, Clock, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import heroImage from '@assets/generated_images/Radio_DJ_studio_portrait_4a97fc19.png';
import morningShowImage from '@assets/generated_images/Morning_show_concept_art_cd87e2ef.png';
import eveningShowImage from '@assets/generated_images/Evening_music_show_concept_91eff014.png';
import nightShowImage from '@assets/generated_images/Night_talk_show_setup_5b9e5b4a.png';
import newsImage from '@assets/generated_images/News_bulletin_backdrop_image_ad8d9119.png';
import eventImage from '@assets/generated_images/Community_event_coverage_photo_27c09e1a.png';
import supporterImage from '@assets/generated_images/Supporter_logo_placeholder_5f468ddb.png';

export default function Home() {
  const [currentSupporterSlide, setCurrentSupporterSlide] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    duration: 40
  });

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const featuredPrograms = [
    {
      title: 'Café da Manhã',
      time: '07:00',
      description: 'Comece o dia com energia, boa música e as melhores notícias!',
      image: morningShowImage,
    },
    {
      title: 'Ritmos da Noite',
      time: '19:00',
      description: 'A melhor seleção musical para embalar sua noite.',
      image: eveningShowImage,
    },
    {
      title: 'Papo Noturno',
      time: '22:00',
      description: 'Conversas profundas e reflexivas para fechar o dia.',
      image: nightShowImage,
    },
    {
      title: 'Tarde Musical',
      time: '14:00',
      description: 'Os melhores hits para animar sua tarde.',
      image: morningShowImage,
    },
    {
      title: 'Madrugada On',
      time: '02:00',
      description: 'Companhia para suas noites em claro com boa música.',
      image: nightShowImage,
    },
  ];

  const recentNews = [
    {
      id: 1,
      title: 'Evento Comunitário Reúne Milhares de Pessoas',
      summary: 'A Aperte o Play FM organizou um evento especial que reuniu a comunidade local para celebrar a música e cultura.',
      image: eventImage,
      date: '28 de Outubro, 2025',
    },
    {
      id: 2,
      title: 'Nova Programação Musical Estreia',
      summary: 'Prepare-se para conhecer novos programas e apresentadores.',
      image: newsImage,
      date: '25 de Outubro, 2025',
    },
    {
      id: 3,
      title: 'Entrevista Exclusiva com Artista Local',
      summary: 'Confira os bastidores da entrevista com um dos maiores talentos.',
      image: newsImage,
      date: '22 de Outubro, 2025',
    },
  ];

  const supporters = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: `Apoiador ${i + 1}`,
    image: supporterImage,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSupporterSlide((prev) => (prev + 1) % supporters.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [supporters.length]);

  return (
    <div className="min-h-screen pb-32">
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gradient-start/20 to-gradient-end/20" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20 sm:mt-0">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 whitespace-nowrap" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }} data-testid="text-hero-title">
            Aperte o Play FM
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white mb-8" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }} data-testid="text-hero-subtitle">
            A Rádio que Conecta Você!
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <Radio className="h-5 w-5 text-white" />
              <span className="text-2xl font-bold text-white" data-testid="text-frequency">87.9 MHz</span>
            </div>
            <Link href="/ao-vivo">
              <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 flex items-center gap-2" data-testid="button-listen-live">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Ouça Ao Vivo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-start gap-4 mb-12 md:justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="w-2 bg-gradient-to-b from-indigo-500 via-blue-500 to-purple-600 rounded-full md:hidden flex-shrink-0 shadow-[0_0_24px_rgba(99,102,241,0.8),0_0_12px_rgba(168,85,247,0.6)] self-stretch" 
              style={{ minWidth: '8px' }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            ></motion.div>
            <motion.h2 
              className="text-4xl font-bold text-left md:text-center" 
              data-testid="text-featured-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <span className="block md:inline">Programações </span>
              <span className="block md:inline">em Destaque</span>
            </motion.h2>
          </motion.div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {featuredPrograms.map((program, index) => (
                  <div 
                    key={index} 
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                  >
                    <ProgramCard {...program} />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute left-0 top-0 bottom-0 flex items-center z-10 -ml-4">
              <Button
                size="icon"
                variant="outline"
                className="bg-slate-950/90 border-indigo-500/40 hover:bg-indigo-950 shadow-[0_0_24px_rgba(99,102,241,0.6)] hover:shadow-[0_0_32px_rgba(99,102,241,0.8)]"
                onClick={scrollPrev}
                data-testid="button-carousel-prev"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute right-0 top-0 bottom-0 flex items-center z-10 -mr-4">
              <Button
                size="icon"
                variant="outline"
                className="bg-slate-950/90 border-indigo-500/40 hover:bg-indigo-950 shadow-[0_0_24px_rgba(99,102,241,0.6)] hover:shadow-[0_0_32px_rgba(99,102,241,0.8)]"
                onClick={scrollNext}
                data-testid="button-carousel-next"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-start gap-4 mb-12 md:justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="w-2 bg-gradient-to-b from-red-500 via-pink-500 to-purple-600 rounded-full md:hidden flex-shrink-0 shadow-[0_0_24px_rgba(239,68,68,0.8),0_0_12px_rgba(236,72,153,0.6)] self-stretch" 
              style={{ minWidth: '8px' }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            ></motion.div>
            <motion.h2 
              className="text-4xl font-bold text-left md:text-center" 
              data-testid="text-live-section-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              Ao Vivo / Agora no Ar
            </motion.h2>
          </motion.div>

          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-red-950/30 to-pink-950/30 border-red-500/30 overflow-hidden">
            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-md px-4 py-2 rounded-full border border-red-500/30 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-sm font-semibold text-red-300">AO VIVO</span>
              </div>
              <h3 className="text-3xl font-bold mb-2" data-testid="text-current-program">Café da Manhã</h3>
              <p className="text-lg text-muted-foreground mb-6">Com as melhores músicas para começar o seu dia!</p>
              <Link href="/ao-vivo">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" data-testid="button-go-live">
                  <Play className="mr-2 h-5 w-5" />
                  Ouvir Ao Vivo
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-start gap-4 mb-12 md:justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="w-2 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-600 rounded-full md:hidden flex-shrink-0 shadow-[0_0_24px_rgba(6,182,212,0.8),0_0_12px_rgba(99,102,241,0.6)] self-stretch" 
              style={{ minWidth: '8px' }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            ></motion.div>
            <motion.h2 
              className="text-4xl font-bold text-left md:text-center" 
              data-testid="text-news-section-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              Notícias Recentes
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 overflow-hidden hover-elevate transition-all duration-300" data-testid="card-featured-news">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={recentNews[0].image} 
                  alt={recentNews[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">{recentNews[0].date}</p>
                <h3 className="text-2xl font-bold mb-3">{recentNews[0].title}</h3>
                <p className="text-muted-foreground mb-4">{recentNews[0].summary}</p>
                <Link href="/noticias">
                  <Button variant="outline">Ler mais</Button>
                </Link>
              </div>
            </Card>

            <div className="flex flex-col gap-6">
              {recentNews.slice(1).map((news) => (
                <Card key={news.id} className="overflow-hidden hover-elevate transition-all duration-300" data-testid={`card-news-${news.id}`}>
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-2">{news.date}</p>
                    <h4 className="text-lg font-bold mb-2">{news.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{news.summary}</p>
                    <Link href="/noticias">
                      <Button variant="outline" size="sm">Ler mais</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/noticias">
              <Button variant="outline" size="lg">Ver Todas as Notícias</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-start gap-4 mb-8 md:justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="w-2 bg-gradient-to-b from-yellow-500 via-orange-500 to-red-600 rounded-full md:hidden flex-shrink-0 shadow-[0_0_24px_rgba(234,179,8,0.8),0_0_12px_rgba(249,115,22,0.6)] self-stretch" 
              style={{ minWidth: '8px' }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            ></motion.div>
            <motion.h2 
              className="text-4xl font-bold text-left md:text-center" 
              data-testid="text-supporters-section-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              Nossos Apoiadores Mantêm o Som no Ar 🎵
            </motion.h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto mb-8">
            <div className="aspect-[2/1] relative overflow-hidden rounded-xl">
              {supporters.map((supporter, index) => (
                <div
                  key={supporter.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSupporterSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Card className="h-full flex items-center justify-center p-8">
                    <img
                      src={supporter.image}
                      alt={supporter.name}
                      className="max-h-full max-w-full object-contain"
                      data-testid={`img-supporter-${supporter.id}`}
                    />
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/apoiadores">
              <Button variant="outline" size="lg">Ver Todos os Apoiadores</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-purple-950/30 to-pink-950/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/50 to-pink-950/50"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-600/20 rounded-full mb-6">
            <Heart className="h-8 w-8 text-pink-400" />
          </div>
          <h2 className="text-4xl font-bold mb-6" data-testid="text-support-call-title">Ajude a Manter a Rádio no Ar</h2>
          <p className="text-lg text-muted-foreground mb-8" data-testid="text-support-call-description">
            Sua contribuição é essencial para continuarmos levando música, informação e entretenimento de qualidade. 
            Cada apoio, independente do valor, faz a diferença!
          </p>
          <Link href="/apoie">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white" data-testid="button-support-call">
              <Heart className="mr-2 h-5 w-5" />
              Quero Apoiar a Rádio
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12" data-testid="text-contact-title">Contato / Redes Sociais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Entre em Contato</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Endereço</p>
                    <p className="text-muted-foreground">Rua da Rádio, 879 - Centro<br />Cidade, Estado - CEP 12345-678</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">E-mail</p>
                    <p className="text-muted-foreground">contato@aperteplayfm.com.br</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Telefone</p>
                    <p className="text-muted-foreground">(11) 98765-4321</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Horário de Atendimento</p>
                    <p className="text-muted-foreground">Segunda a Sexta: 8h às 18h<br />Sábado: 9h às 13h</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Siga-nos nas Redes</h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Card className="p-6 hover-elevate transition-all duration-300 cursor-pointer text-center">
                    <Instagram className="h-8 w-8 mx-auto mb-3 text-pink-500" />
                    <p className="font-semibold">Instagram</p>
                    <p className="text-sm text-muted-foreground">@aperteplayfm</p>
                  </Card>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Card className="p-6 hover-elevate transition-all duration-300 cursor-pointer text-center">
                    <Facebook className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                    <p className="font-semibold">Facebook</p>
                    <p className="text-sm text-muted-foreground">/aperteplayfm</p>
                  </Card>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Card className="p-6 hover-elevate transition-all duration-300 cursor-pointer text-center">
                    <Youtube className="h-8 w-8 mx-auto mb-3 text-red-500" />
                    <p className="font-semibold">YouTube</p>
                    <p className="text-sm text-muted-foreground">Aperte o Play FM</p>
                  </Card>
                </a>
                <a href="https://wa.me/5511987654321" target="_blank" rel="noopener noreferrer">
                  <Card className="p-6 hover-elevate transition-all duration-300 cursor-pointer text-center">
                    <MessageCircle className="h-8 w-8 mx-auto mb-3 text-green-500" />
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">(11) 98765-4321</p>
                  </Card>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Aperte o Play FM</h3>
              <p className="text-muted-foreground mb-4">
                A rádio que conecta você com música, informação e entretenimento de qualidade 24 horas por dia.
              </p>
              <div className="flex items-center gap-2 text-primary">
                <Radio className="h-5 w-5" />
                <span className="text-xl font-bold">87.9 MHz</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/programacao" className="text-muted-foreground hover:text-primary transition-colors">Programação</Link></li>
                <li><Link href="/ao-vivo" className="text-muted-foreground hover:text-primary transition-colors">Ao Vivo</Link></li>
                <li><Link href="/noticias" className="text-muted-foreground hover:text-primary transition-colors">Notícias</Link></li>
                <li><Link href="/apoiadores" className="text-muted-foreground hover:text-primary transition-colors">Apoiadores</Link></li>
                <li><Link href="/apoie" className="text-muted-foreground hover:text-primary transition-colors">Apoie</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">contato@aperteplayfm.com.br</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">(11) 98765-4321</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Rua da Rádio, 879 - Centro</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Aperte o Play FM 87.9. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
