import type { Express } from "express";
import { createServer, type Server } from "http";
import http from "http";
import https from "https";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Rota de clima para o Salamandra - retorna temperatura de Pinheiro Machado, RS
  app.get("/clima", (req, res) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const city = "Pinheiro Machado";
    const country = "BR";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},${country}&units=metric&lang=pt_br&appid=${apiKey}`;
    
    https.get(url, (apiRes) => {
      let data = "";
      apiRes.on("data", (chunk) => { data += chunk; });
      apiRes.on("end", () => {
        try {
          const weather = JSON.parse(data);
          const temp = Math.round(weather.main.temp);
          const humidity = weather.main.humidity;
          const description = weather.weather[0].description;
          
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.setHeader("Cache-Control", "no-cache");
          res.send(`<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Clima</title></head>
<body>
<p>Temperatura: ${temp} graus</p>
<p>Umidade: ${humidity}%</p>
<p>Condicao: ${description}</p>
</body>
</html>`);
        } catch (e) {
          res.status(500).send("Erro ao processar clima");
        }
      });
    }).on("error", () => {
      res.status(500).send("Erro ao buscar clima");
    });
  });

  // Rota de clima em texto simples para Salamandra
  app.get("/clima.txt", (req, res) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const city = "Pinheiro Machado";
    const country = "BR";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},${country}&units=metric&lang=pt_br&appid=${apiKey}`;
    
    https.get(url, (apiRes) => {
      let data = "";
      apiRes.on("data", (chunk) => { data += chunk; });
      apiRes.on("end", () => {
        try {
          const weather = JSON.parse(data);
          const temp = Math.round(weather.main.temp);
          
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.setHeader("Cache-Control", "no-cache");
          res.send(`${temp}`);
        } catch (e) {
          res.status(500).send("0");
        }
      });
    }).on("error", () => {
      res.status(500).send("0");
    });
  });

  // Proxy para o stream de áudio - evita problema de mixed content
  app.get("/api/stream", (req, res) => {
    const streamUrl = "http://186.250.8.32:6750/stream";
    
    
    const proxyReq = http.get(streamUrl, (proxyRes) => {
      // Passa os headers de content-type
      res.setHeader("Content-Type", proxyRes.headers["content-type"] || "audio/mpeg");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Access-Control-Allow-Origin", "*");
      
      // Pipe do stream
      proxyRes.pipe(res);
      
      proxyRes.on("error", () => {
        res.status(500).end();
      });
    });
    
    proxyReq.on("error", () => {
      res.status(500).json({ error: "Failed to connect to stream" });
    });
    
    req.on("close", () => {
      proxyReq.destroy();
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
