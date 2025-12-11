import type { Express } from "express";
import { createServer, type Server } from "http";
import http from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy para o stream de áudio - evita problema de mixed content
  app.get("/api/stream", (req, res) => {
    const streamUrl = "http://186.250.8.32:6750/stream";
    
    console.log("Proxying audio stream from:", streamUrl);
    
    const proxyReq = http.get(streamUrl, (proxyRes) => {
      // Passa os headers de content-type
      res.setHeader("Content-Type", proxyRes.headers["content-type"] || "audio/mpeg");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Access-Control-Allow-Origin", "*");
      
      // Pipe do stream
      proxyRes.pipe(res);
      
      proxyRes.on("error", (err) => {
        console.error("Proxy response error:", err);
        res.status(500).end();
      });
    });
    
    proxyReq.on("error", (err) => {
      console.error("Proxy request error:", err);
      res.status(500).json({ error: "Failed to connect to stream" });
    });
    
    req.on("close", () => {
      proxyReq.destroy();
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
