import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// ---- Demo in-memory data
type Restaurant = { id: string; name: string; address: string; city: string };
type MenuItem = { id: string; name: string; priceCents: number; diet: 'veg' | 'non_veg'; halal: boolean };

const restaurants: Restaurant[] = [
  { id: 'r1', name: 'Mumbai Masala', address: 'Via Roma 1', city: 'Milano' },
  { id: 'r2', name: 'Green Leaf Pure Veg', address: 'Via Torino 99', city: 'Milano' }
];

const menu: Record<string, MenuItem[]> = {
  r1: [
    { id: 'm1', name: 'Butter Chicken', priceCents: 1390, diet: 'non_veg', halal: true },
    { id: 'm2', name: 'Paneer Tikka', priceCents: 1090, diet: 'veg', halal: true }
  ],
  r2: [{ id: 'm3', name: 'Veg Thali', priceCents: 990, diet: 'veg', halal: true }]
};

// ---- Routes
app.get('/live', (_req: Request, res: Response) => res.json({ ok: true }));
app.get('/api/health', (_req: Request, res: Response) =>
  res.json({ ok: true, restaurants: restaurants.length })
);

app.get('/api/restaurants', (req: Request, res: Response) => {
  // For now just return all; you can use req.query to filter
  res.json(restaurants);
});

app.get('/api/restaurants/:id/menu', (req: Request, res: Response) => {
  const items = menu[req.params.id] ?? [];
  res.json(items);
});

app.post('/api/auth/guest', (_req: Request, res: Response) => {
  res.json({ userId: `guest_${Math.random().toString(36).slice(2)}` });
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`Food-Friendly backend on http://localhost:${PORT}`));
