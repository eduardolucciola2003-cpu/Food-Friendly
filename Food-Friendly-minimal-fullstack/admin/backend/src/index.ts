import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router } from './routes';

const app = express();

// env
const PORT = Number(process.env.PORT || 4000);
const allowed = (process.env.CORS_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // allow same-origin / curl
      if (allowed.length === 0 || allowed.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
  })
);

// health
app.get('/', (_req: Request, res: Response) => {
  res.json({ ok: true, service: 'food-friendly-backend' });
});

// api
app.use('/api', router);

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal error', details: err?.message || String(err) });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
