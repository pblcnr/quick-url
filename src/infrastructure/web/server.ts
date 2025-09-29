import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

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
