import express from "express";
import cors from "cors";
import { Router } from "express";

export function createApp(router: Router) {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(router);

  return app;
}

export function startServer(app: express.Application): void {
  const port = process.env.PORT;

  if (!port) {
    throw new Error("PORT não configurada no .env");
  }

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}