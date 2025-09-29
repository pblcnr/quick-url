import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

export const startServer = () => {
  const port = process.env.PORT;

  if (!port) {
    throw new Error("PORTA não configurada no .env");
  }
  
  app.listen(port, () => {
    console.log(`Servidor rodando em ${port}`);
  });
};

export default app;