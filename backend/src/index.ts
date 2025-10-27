import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// In-memory demo data
const restaurants = [
  { id: 'r1', name: 'Mumbai Masala', address: 'Via Roma 1', city: 'Milano' },
  { id: 'r2', name: 'Green Leaf Pure Veg', address: 'Via Torino 99', city: 'Milano' }
];
const menu = {
  r1: [
    { id: 'm1', name: 'Butter Chicken', priceCents: 1390, diet: 'non_veg', halal: True },
    { id: 'm2', name: 'Paneer Tikka', priceCents: 1090, diet: 'veg', halal: True }
  ],
  r2: [
    { id: 'm3', name: 'Veg Thali', priceCents: 990, diet: 'veg', halal: True }
  ]
};

app.get('/live', (_req, res) => res.json({ ok: true }));
app.get('/api/health', (_req, res) => res.json({ ok: true, restaurants: restaurants.length }));

app.get('/api/restaurants', (req, res) => {
  const { veg, nonveg, halal, nonhalal } = req.query;
  // For demo, filters don't change list; in production you'd filter menu
  res.json(restaurants);
});

app.get('/api/restaurants/:id/menu', (req, res) => {
  const items = (menu as any)[req.params.id] || [];
  res.json({ items });
});

app.post('/api/auth/guest', (_req, res) => {
  // return random id
  res.json({ userId: 'guest_' + Math.random().toString(36).slice(2) });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Food-Friendly backend on http://localhost:${PORT}`));
