import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

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

// ---------- ROUTES ----------

// Root route (so you don't see "Cannot GET /")
app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'food-friendly-backend' });
});

// Required by Render — Health Check endpoint
app.get('/healthz', (_req, res) => res.send('ok'));

// Example API route you can extend later
app.get('/api/version', (_req, res) => {
  res.json({ version: '0.1.0', time: new Date().toISOString() });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    error: err?.message || 'Internal error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
