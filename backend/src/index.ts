import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/healthz", (_req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Food-Friendly API is up" });
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
