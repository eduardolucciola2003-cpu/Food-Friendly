import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ ok: true }); // <-- JS uses true, not True
});

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
