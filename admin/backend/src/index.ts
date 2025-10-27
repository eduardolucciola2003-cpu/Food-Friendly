import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router } from './routes.js';

const app = express();
const PORT = process.env.PORT || 4000;
const origins = (process.env.CORS_ORIGIN || '').split(',').filter(Boolean);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (origins.length === 0 || origins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
}));

app.get('/', (_req, res) => res.json({ ok: true, service: 'veg-backend' }));
app.use('/api', router);

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ error: 'Internal error', details: err?.message || String(err) });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
