import { Router, Request, Response } from 'express';

export const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'healthy' });
});

router.get('/version', (_req: Request, res: Response) => {
  res.json({ version: '0.1.0' });
});

// Example endpoint to prove filters wire-up
router.get('/restaurants', (req: Request, res: Response) => {
  const filter = String(req.query.filter || 'all'); // veg | nonveg | halal | nonhalal
  res.json({
    filter,
    items: [
      { id: 1, name: 'Green Leaf', veg: true, halal: true },
      { id: 2, name: 'Spice Hub', veg: false, halal: true },
    ],
  });
});
