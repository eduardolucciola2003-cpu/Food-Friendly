import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptionsDelegate } from 'cors';
import morgan from 'morgan';
import { router } from './routes'; // routes.ts should export `router`

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const origins = (process.env.CORS_ORIGIN || '').split(',').filter(Boolean);

app.use(express.json());
app.use(morgan('dev'));

const corsDelegate: CorsOptionsDelegate = (origin, callback) => {
  if (!origin) return callback(null, true); // allow same-origin / curl
  if (origins.length === 0 || origins.includes(origin)) return callback(null, true);
  return callback(new Error('Not allowed by CORS'));
};
app.use(cors(corsDelegate));

app.get('/', (_req: Request, res: Response) =>
  res.json({ ok: true, service: 'veg-backend' })
);
app.use('/api', router);

// Error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const message = err instanceof Error ? err.message : String(err);
 
