import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ ok: true, status: "healthy" });
});

// Example root route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Food-Friendly API is running 🚀" });
});

// Render provides PORT; default to 4000 locally
const PORT = Number(process.env.PORT ?? 4000);

// Bind to 0.0.0.0 for Docker/Render
app.listen(PORT, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
