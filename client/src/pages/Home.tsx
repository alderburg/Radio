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
import logoColor from '/logo-aperte-play-color.png?url';
import sponsor1 from '@assets/stock_images/company_brand_logos__ff725cae.jpg';
import sponsor2 from '@assets/stock_images/company_brand_logos__f6b03a09.jpg';
import sponsor3 from '@assets/stock_images/company_brand_logos__8cc00b67.jpg';
import sponsor4 from '@assets/stock_images/company_brand_logos__c01c0461.jpg';
import sponsor5 from '@assets/stock_images/company_brand_logos__1e41b510.jpg';
import sponsor6 from '@assets/stock_images/company_brand_logos__431445f0.jpg';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    duration: 40
  });

  const [supportersEmblaRef, supportersEmblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    duration: 40
  });

  const imagesToPreload = [
    heroImage,
    morningShowImage,
    eveningShowImage,
    nightShowImage,
    newsImage,
    eventImage,
    sponsor1,
    sponsor2,
    sponsor3,
    sponsor4,
    sponsor5,
    sponsor6,
  ];

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (loadedCount === totalImages) {
          setTimeout(() => setIsLoading(false), 500);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (loadedCount === totalImages) {
          setTimeout(() => setIsLoading(false), 500);
        }
      };
    });
  }, []);

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

  useEffect(() => {
    if (!supportersEmblaApi) return;

    const autoplay = setInterval(() => {
      if (supportersEmblaApi.canScrollNext()) {
        supportersEmblaApi.scrollNext();
      } else {
        supportersEmblaApi.scrollTo(0);
      }
    }, 4000);

    return () => clearInterval(autoplay);
  }, [supportersEmblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollSupportersPrev = useCallback(() => {
    if (supportersEmblaApi) supportersEmblaApi.scrollPrev();
  }, [supportersEmblaApi]);

  const scrollSupportersNext = useCallback(() => {
    if (supportersEmblaApi) supportersEmblaApi.scrollNext();
  }, [supportersEmblaApi]);

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

  const supporters = [
    { id: 1, name: 'Apoiador 1', image: sponsor1 },
    { id: 2, name: 'Apoiador 2', image: sponsor2 },
    { id: 3, name: 'Apoiador 3', image: sponsor3 },
    { id: 4, name: 'Apoiador 4', image: sponsor4 },
    { id: 5, name: 'Apoiador 5', image: sponsor5 },
    { id: 6, name: 'Apoiador 6', image: sponsor6 },
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
        <div className="mb-8">
          <img 
            src={logoColor} 
            alt="Aperte o Play FM" 
            className="h-32 w-auto animate-pulse" 
          />
        </div>
        <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${(imagesLoaded / imagesToPreload.length) * 100}%` }}
          />
        </div>
        <p className="text-white mt-4 text-sm">Carregando... {Math.round((imagesLoaded / imagesToPreload.length) * 100)}%</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
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
      <section className="py-16 px-4 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-start gap-4 mb-12 md:justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="w-2 bg-gradient-to-b from-green-500 via-emerald-500 to-teal-600 rounded-full md:hidden flex-shrink-0 shadow-[0_0_24px_rgba(34,197,94,0.8),0_0_12px_rgba(20,184,166,0.6)] self-stretch" 
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
              Agora no Ar
            </motion.h2>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-emerald-500/30 overflow-hidden backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-6 p-8">
                <div className="flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 bg-emerald-600/20 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-500/40 mb-6 w-fit">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-semibold text-emerald-300">AO VIVO</span>
                  </div>
                  <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent" data-testid="text-current-program">Café da Manhã</h3>
                  <p className="text-lg text-slate-300 mb-6">Com as melhores músicas para começar o seu dia!</p>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Radio className="h-5 w-5" />
                      <span className="font-semibold">87.9 MHz</span>
                    </div>
                    <div className="h-1 w-1 rounded-full bg-slate-600"></div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">07:00 - 10:00</span>
                    </div>
                  </div>
                  <Link href="/ao-vivo">
                    <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-900/50" data-testid="button-go-live">
                      <Play className="mr-2 h-5 w-5" />
                      Ouvir Agora
                    </Button>
                  </Link>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-square md:aspect-auto">
                  <img 
                    src={morningShowImage} 
                    alt="Programa ao vivo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>
            </Card>
          </div>
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
            className="flex items-start gap-4 mb-12 md:justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="w-2 bg-gradient-to-b from-amber-500 via-orange-500 to-red-600 rounded-full md:hidden flex-shrink-0 shadow-[0_0_24px_rgba(245,158,11,0.8),0_0_12px_rgba(249,115,22,0.6)] self-stretch" 
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
              Nossos Apoiadores
            </motion.h2>
          </motion.div>

          <div className="relative max-w-6xl mx-auto mb-8">
            <div className="overflow-hidden" ref={supportersEmblaRef}>
              <div className="flex gap-6">
                {supporters.map((supporter) => (
                  <div 
                    key={supporter.id} 
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                  >
                    <Card className="h-64 flex items-center justify-center p-8 bg-slate-900/50 border-slate-700/50 hover-elevate transition-all duration-300">
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

            <div className="absolute left-0 top-0 bottom-0 flex items-center z-10 -ml-4">
              <Button
                size="icon"
                variant="outline"
                className="bg-slate-950/90 border-orange-500/40 hover:bg-orange-950 shadow-[0_0_24px_rgba(249,115,22,0.6)] hover:shadow-[0_0_32px_rgba(249,115,22,0.8)]"
                onClick={scrollSupportersPrev}
                data-testid="button-supporters-carousel-prev"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute right-0 top-0 bottom-0 flex items-center z-10 -mr-4">
              <Button
                size="icon"
                variant="outline"
                className="bg-slate-950/90 border-orange-500/40 hover:bg-orange-950 shadow-[0_0_24px_rgba(249,115,22,0.6)] hover:shadow-[0_0_32px_rgba(249,115,22,0.8)]"
                onClick={scrollSupportersNext}
                data-testid="button-supporters-carousel-next"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Link href="/apoiadores">
              <Button variant="outline" size="lg">Ver Todos os Apoiadores</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="pt-16 pb-8 px-4 bg-gradient-to-br from-indigo-950/40 to-blue-950/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 to-blue-950/30"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-6 border border-blue-500/30">
            <Heart className="h-8 w-8 text-blue-400" />
          </div>
          <h2 className="text-4xl font-bold mb-6" data-testid="text-support-call-title">Ajude a Manter a Rádio no Ar</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto" data-testid="text-support-call-description">
            Sua contribuição é essencial para continuarmos levando música, informação e entretenimento de qualidade. 
            Cada apoio, independente do valor, faz a diferença!
          </p>
          <Link href="/apoie">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-900/50" data-testid="button-support-call">
              <Heart className="mr-2 h-5 w-5" />
              Quero Apoiar a Rádio
            </Button>
          </Link>
        </div>
      </section>
      <footer className="bg-slate-950 border-t border-slate-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
            <div>
              <img 
                src={logoColor} 
                alt="Aperte o Play FM" 
                className="h-20 w-auto mb-3" 
              />
              <p className="text-muted-foreground mb-3 text-sm">
                A rádio que conecta você com música, informação e entretenimento de qualidade 24 horas por dia.
              </p>
              <div className="flex items-center gap-2 text-primary">
                <Radio className="h-4 w-4" />
                <span className="text-lg font-bold">87.9 MHz</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link></li>
                <li><Link href="/programacao" className="text-muted-foreground hover:text-primary transition-colors text-sm">Programação</Link></li>
                <li><Link href="/ao-vivo" className="text-muted-foreground hover:text-primary transition-colors text-sm">Ao Vivo</Link></li>
                <li><Link href="/noticias" className="text-muted-foreground hover:text-primary transition-colors text-sm">Notícias</Link></li>
                <li><Link href="/apoiadores" className="text-muted-foreground hover:text-primary transition-colors text-sm">Apoiadores</Link></li>
                <li><Link href="/apoie" className="text-muted-foreground hover:text-primary transition-colors text-sm">Apoie</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Contato</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs">Rua Barao do Rio Branco, N°424</p>
                    <p className="text-xs">Cidade, Estado - CEP 12345-678</p>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <a href="mailto:contato@aperteplayfm.com.br" className="text-xs hover:text-primary transition-colors">contato@aperteplayfm.com.br</a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <a href="tel:+5511987654321" className="text-xs hover:text-primary transition-colors">(11) 98765-4321</a>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs">Seg-Sex: 8h às 18h</p>
                    <p className="text-xs">Sábado: 9h às 13h</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Redes Sociais</h4>
              <div className="flex flex-wrap gap-3 mb-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 transition-colors border border-purple-500/20">
                  <Instagram className="h-5 w-5 text-purple-400" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600/20 hover:bg-blue-600/30 transition-colors border border-blue-500/20">
                  <Facebook className="h-5 w-5 text-blue-400" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600/20 hover:bg-red-600/30 transition-colors border border-red-500/20">
                  <Youtube className="h-5 w-5 text-red-400" />
                </a>
                <a href="https://wa.me/5511987654321" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600/20 hover:bg-green-600/30 transition-colors border border-green-500/20">
                  <MessageCircle className="h-5 w-5 text-green-400" />
                </a>
              </div>
              <p className="text-xs text-muted-foreground">Conecte-se conosco nas redes sociais para ficar por dentro de tudo!</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Aperte o Play FM. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
