import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
export const router = Router();

router.get('/health', async (_req, res) => {
  const restaurants = await prisma.restaurant.count();
  res.json({ ok: true, restaurants });
});

router.get('/restaurants', async (req, res) => {
  const veg = req.query.veg === 'true';
  const nonveg = req.query.nonveg === 'true';
  const halal = req.query.halal === 'true';
  const nonhalal = req.query.nonhalal === 'true';

  const itemWhere: any = { isActive: true };
  if (veg && !nonveg) itemWhere.diet = 'veg';
  if (nonveg && !veg) itemWhere.diet = 'non_veg';
  if (halal && !nonhalal) itemWhere.isHalal = true;
  if (nonhalal && !halal) itemWhere.isHalal = false;

  const restaurants = await prisma.restaurant.findMany({
    where: {
      isActive: true,
      menuItems: { some: itemWhere }
    },
    orderBy: { name: 'asc' }
  });
  res.json(restaurants);
});

router.get('/restaurants/:id/menu', async (req, res) => {
  const { id } = req.params;
  const veg = req.query.veg === 'true';
  const nonveg = req.query.nonveg === 'true';
  const halal = req.query.halal === 'true';
  const nonhalal = req.query.nonhalal === 'true';

  const restaurant = await prisma.restaurant.findUnique({ where: { id } });
  if (!restaurant) return res.status(404).json({ error: 'Not found' });

  const where: any = { restaurantId: id, isActive: true };
  if (veg && !nonveg) where.diet = 'veg';
  if (nonveg && !veg) where.diet = 'non_veg';
  if (halal && !nonhalal) where.isHalal = true;
  if (nonhalal && !halal) where.isHalal = false;

  const items = await prisma.menuItem.findMany({ where, orderBy: { name: 'asc' } });
  res.json({ restaurant, items });
});

router.post('/restaurants', async (req, res) => {
  const schema = z.object({
    name: z.string().min(2),
    address: z.string().default(''),
    isVegOnly: z.boolean().optional().default(false)
  });
  const data = schema.parse(req.body);
  const created = await prisma.restaurant.create({ data });
  res.status(201).json(created);
});

router.post('/restaurants/:id/menu', async (req, res) => {
  const { id } = req.params;
  const schema = z.object({
    name: z.string().min(2),
    description: z.string().optional().default(''),
    priceCents: z.number().int().positive(),
    diet: z.enum(['veg','non_veg']),
    isHalal: z.boolean()
  });
  const payload = schema.parse(req.body);

  const restaurant = await prisma.restaurant.findUnique({ where: { id } });
  if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });

  if (restaurant.isVegOnly && payload.diet === 'non_veg') {
    return res.status(400).json({ error: 'This restaurant is marked Veg-only' });
    }

  const created = await prisma.menuItem.create({
    data: { restaurantId: id, ...payload }
  });
  res.status(201).json(created);
});
