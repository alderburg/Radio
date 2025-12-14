import type { Express } from "express";
import { createServer, type Server } from "http";
import http from "http";
import https from "https";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Rota de clima para o Salamandra - retorna temperatura de Pinheiro Machado, RS
  // Formato compatível com Beautiful Weather / currenweather.html
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
          
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
          
          // Formato mínimo para Salamandra - apenas temperatura e umidade
          res.send(`<html><body>
<span id="temperature">${temp}</span>
<span id="humidity">${humidity}</span>
</body></html>`);
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
    
    const options = {
      timeout: 30000,
      headers: {
        'User-Agent': 'ApertePlayFM/1.0',
        'Accept': '*/*',
        'Connection': 'keep-alive',
      }
    };
    
    const proxyReq = http.get(streamUrl, options, (proxyRes) => {
      res.setHeader("Content-Type", proxyRes.headers["content-type"] || "audio/mpeg");
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("Transfer-Encoding", "chunked");
      
      proxyRes.pipe(res);
      
      proxyRes.on("error", (err) => {
        console.log("Stream proxy error:", err.message);
        if (!res.headersSent) {
          res.status(500).end();
        }
      });
      
      proxyRes.on("end", () => {
        console.log("Stream ended from source");
      });
    });
    
    proxyReq.on("timeout", () => {
      console.log("Stream proxy timeout");
      proxyReq.destroy();
    });
    
    proxyReq.on("error", (err) => {
      console.log("Stream connection error:", err.message);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to connect to stream" });
      }
    });
    
    req.on("close", () => {
      proxyReq.destroy();
    });
    
    req.on("aborted", () => {
      proxyReq.destroy();
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
