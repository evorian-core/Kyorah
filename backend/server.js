import "dotenv/config";

console.log("DATABASE_URL:");
console.log(process.env.DATABASE_URL);

import express from "express";
import cors from "cors";
import pool from "./config/database.js";
import { initializeDatabase } from "./database/init.js";
import authRoutes from "./routes/auth.routes.js"

import chatRoutes from "./routes/chat.routes.js";
import chatsRoutes from "./routes/chats.routes.js";

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:4173",
        "http://localhost:5174",
    ],
    credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "online",
    name: "Kyorah API",
    version: "0.1.0",
  });
});

app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatsRoutes);

try {
  await pool.query("SELECT NOW()");
  console.log("✅ PostgreSQL conectado com sucesso!");
} catch (error) {
  console.error("❌ Erro ao conectar ao PostgreSQL:");
  console.error(error);
}


const PORT = process.env.PORT || 3001;

// await initializeDatabase();

export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Kyorah API rodando na porta ${PORT}`);
  });
}