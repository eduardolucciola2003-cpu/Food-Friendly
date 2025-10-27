import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req: Request, res: Response) => {
  res.json({ ok: true, message: "Food-Friendly API is running" });
});

// If you previously used `True` (capital T) anywhere, change to boolean `true`.
const PORT = Number(process.env.PORT ?? 4000);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on :${PORT}`);
});
