import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router } from './routes.js';   // ✅ 1) IMPORT HERE

const app = express();
const PORT = process.env.PORT || 4000;

// Accept multiple CORS origins if needed
const origins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // allow tools like Postman
    if (origins.length === 0 || origins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  }
}));

// ---------- ROOT ROUTES ----------
app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'food-friendly-backend' });
});

app.get('/healthz', (_req, res) => res.send('ok'));

app.get('/api/version', (_req, res) => {
  res.json({ version: '0.1.0', time: new Date().toISOString() });
});

// ---------- ATTACH YOUR API ROUTES ----------
app.use('/api', router);  // ✅ 2) USE ROUTER HERE

// ---------- GLOBAL ERROR HANDLER ----------
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    error: err?.message || 'Internal error'
  });
});

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
