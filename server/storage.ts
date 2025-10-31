import { type User, type InsertUser, type Program, type InsertProgram, type News, type InsertNews, type Supporter, type InsertSupporter } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllPrograms(): Promise<Program[]>;
  getProgramsByDay(day: string): Promise<Program[]>;
  createProgram(program: InsertProgram): Promise<Program>;
  
  getAllNews(): Promise<News[]>;
  getNewsById(id: number): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;
  
  getAllSupporters(): Promise<Supporter[]>;
  createSupporter(supporter: InsertSupporter): Promise<Supporter>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private programs: Map<string, Program>;
  private news: Map<number, News>;
  private supporters: Map<number, Supporter>;
  private newsIdCounter: number;
  private supporterIdCounter: number;

  constructor() {
    this.users = new Map();
    this.programs = new Map();
    this.news = new Map();
    this.supporters = new Map();
    this.newsIdCounter = 1;
    this.supporterIdCounter = 1;
    
    this.seedInitialData();
  }

  private seedInitialData() {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    
    days.forEach(day => {
      const morningProgram: Program = {
        id: randomUUID(),
        title: day === 'Sábado' ? 'Manhã de Sábado' : day === 'Domingo' ? 'Domingo Tranquilo' : 'Café da Manhã',
        time: day === 'Sábado' ? '08:00' : day === 'Domingo' ? '09:00' : '07:00',
        description: day === 'Sábado' ? 'Relaxe no fim de semana.' : day === 'Domingo' ? 'Música relaxante.' : 'Comece o dia com energia!',
        image: '/api/placeholder-image/morning',
        day,
      };
      
      const afternoonProgram: Program = {
        id: randomUUID(),
        title: day === 'Segunda' ? 'Ritmos da Tarde' : day === 'Terça' ? 'Rock da Tarde' : day === 'Quarta' ? 'Pop Hits' : day === 'Quinta' ? 'Sertanejo' : day === 'Sexta' ? 'Esquenta Sexta' : day === 'Sábado' ? 'Show de Talentos' : 'MPB da Tarde',
        time: day === 'Segunda' ? '14:00' : day === 'Terça' ? '15:00' : day === 'Quarta' ? '16:00' : day === 'Quinta' ? '17:00' : day === 'Sexta' ? '18:00' : day === 'Sábado' ? '16:00' : '15:00',
        description: day === 'Segunda' ? 'Música para sua tarde.' : day === 'Terça' ? 'Os melhores rocks.' : day === 'Quarta' ? 'Os sucessos do momento.' : day === 'Quinta' ? 'O melhor do sertanejo.' : day === 'Sexta' ? 'Preparando o fim de semana.' : day === 'Sábado' ? 'Artistas locais.' : 'A melhor MPB.',
        image: '/api/placeholder-image/evening',
        day,
      };
      
      const nightProgram: Program = {
        id: randomUUID(),
        title: day === 'Terça' ? 'Jazz Night' : day === 'Sexta' ? 'Night Club' : day === 'Sábado' ? 'Baladão' : day === 'Domingo' ? 'Clássicos' : 'Papo Noturno',
        time: day === 'Terça' ? '23:00' : day === 'Sexta' ? '23:00' : day === 'Sábado' ? '21:00' : day === 'Domingo' ? '20:00' : '22:00',
        description: day === 'Terça' ? 'Noite de jazz.' : day === 'Sexta' ? 'Balada na rádio.' : day === 'Sábado' ? 'A festa continua.' : day === 'Domingo' ? 'Músicas atemporais.' : 'Conversas profundas.',
        image: '/api/placeholder-image/night',
        day,
      };
      
      this.programs.set(morningProgram.id, morningProgram);
      this.programs.set(afternoonProgram.id, afternoonProgram);
      this.programs.set(nightProgram.id, nightProgram);
    });

    const newsArticles: InsertNews[] = [
      {
        title: 'Evento Comunitário Reúne Milhares de Pessoas',
        summary: 'A Aperte o Play FM organizou um evento especial que reuniu a comunidade local para celebrar a música e cultura.',
        content: 'A Aperte o Play FM organizou no último sábado um evento especial que reuniu a comunidade local para celebrar a música e a cultura regional. O evento contou com a presença de mais de 5 mil pessoas e apresentações de artistas locais.\n\nA programação incluiu shows ao vivo, food trucks, atividades para crianças e sorteios de prêmios. Os apresentadores da rádio estiveram presentes interagindo com o público e comandando as atrações.\n\n"Foi um sucesso absoluto", comentou o diretor da emissora. "Eventos como este reforçam nosso compromisso com a comunidade e mostram a força que a rádio tem em conectar pessoas."\n\nO próximo evento está previsto para acontecer no final do ano, com uma programação ainda maior e mais atrações. Fique ligado na 87.9 FM para não perder nenhuma novidade!',
        image: '/api/placeholder-image/event',
        date: '28 de Outubro, 2025',
      },
      {
        title: 'Nova Programação Musical Estreia na Próxima Semana',
        summary: 'Prepare-se para conhecer novos programas e apresentadores que vão agitar suas manhãs e tardes.',
        content: 'A partir da próxima semana, a Aperte o Play FM traz novidades na programação com novos programas musicais e apresentadores que prometem agitar as manhãs e tardes dos ouvintes.',
        image: '/api/placeholder-image/news',
        date: '25 de Outubro, 2025',
      },
      {
        title: 'Entrevista Exclusiva com Artista Local',
        summary: 'Confira os bastidores da entrevista com um dos maiores talentos da nossa região.',
        content: 'Nossa equipe teve o privilégio de entrevistar um dos maiores talentos musicais da região, trazendo insights sobre sua carreira e próximos projetos.',
        image: '/api/placeholder-image/news',
        date: '22 de Outubro, 2025',
      },
      {
        title: 'Aperte o Play FM Completa 5 Anos no Ar',
        summary: 'Celebramos cinco anos levando alegria, música e informação para nossos ouvintes.',
        content: 'Completamos 5 anos de história, conectando pessoas através da música e informação de qualidade. Obrigado a todos que fazem parte dessa jornada!',
        image: '/api/placeholder-image/event',
        date: '18 de Outubro, 2025',
      },
      {
        title: 'Campanha de Doação Arrecada Toneladas de Alimentos',
        summary: 'Nossa campanha solidária superou as expectativas e ajudou centenas de famílias.',
        content: 'A campanha de arrecadação de alimentos promovida pela rádio foi um grande sucesso, arrecadando toneladas de alimentos que foram distribuídos para famílias necessitadas.',
        image: '/api/placeholder-image/event',
        date: '15 de Outubro, 2025',
      },
      {
        title: 'Novos Equipamentos Melhoram Qualidade do Sinal',
        summary: 'Investimento em tecnologia garante melhor experiência para nossos ouvintes.',
        content: 'Investimos em equipamentos de última geração para melhorar a qualidade do sinal e proporcionar a melhor experiência para você que nos acompanha.',
        image: '/api/placeholder-image/news',
        date: '10 de Outubro, 2025',
      },
    ];

    newsArticles.forEach(article => {
      const id = this.newsIdCounter++;
      const newsItem: News = {
        id,
        title: article.title,
        summary: article.summary,
        content: article.content,
        image: article.image,
        date: article.date,
      };
      this.news.set(newsItem.id, newsItem);
    });

    for (let i = 1; i <= 12; i++) {
      const supporter: Supporter = {
        id: this.supporterIdCounter++,
        name: `Apoiador ${i}`,
        image: '/api/placeholder-image/supporter',
      };
      this.supporters.set(supporter.id, supporter);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async getProgramsByDay(day: string): Promise<Program[]> {
    return Array.from(this.programs.values()).filter(p => p.day === day);
  }

  async createProgram(insertProgram: InsertProgram): Promise<Program> {
    const id = randomUUID();
    const program: Program = { ...insertProgram, id };
    this.programs.set(id, program);
    return program;
  }

  async getAllNews(): Promise<News[]> {
    return Array.from(this.news.values()).sort((a, b) => b.id - a.id);
  }

  async getNewsById(id: number): Promise<News | undefined> {
    return this.news.get(id);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = this.newsIdCounter++;
    const newsItem: News = {
      id,
      title: insertNews.title,
      summary: insertNews.summary,
      content: insertNews.content,
      image: insertNews.image,
      date: insertNews.date,
    };
    this.news.set(newsItem.id, newsItem);
    return newsItem;
  }

  async getAllSupporters(): Promise<Supporter[]> {
    return Array.from(this.supporters.values());
  }

  async createSupporter(insertSupporter: InsertSupporter): Promise<Supporter> {
    const id = this.supporterIdCounter++;
    const supporter: Supporter = {
      id,
      name: insertSupporter.name,
      image: insertSupporter.image,
    };
    this.supporters.set(supporter.id, supporter);
    return supporter;
  }
}

export const storage = new MemStorage();
