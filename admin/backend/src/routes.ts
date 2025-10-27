import { Router } from 'express';

export const router = Router();

// —— Demo in-memory data you can replace with DB later ——
const restaurants = [
  {
    id: 'r1',
    name: 'Green Leaf Diner',
    tags: ['Veg', 'Halal'],
    dishes: [
      { id: 'd1', name: 'Paneer Tikka', diet: 'Veg', halal: 'Halal' },
      { id: 'd2', name: 'Veg Biryani', diet: 'Veg', halal: 'Halal' }
    ]
  },
  {
    id: 'r2',
    name: 'Spice House',
    tags: ['Non-Veg', 'Halal'],
    dishes: [
      { id: 'd3', name: 'Chicken Biryani', diet: 'Non-Veg', halal: 'Halal' },
      { id: 'd4', name: 'Butter Chicken', diet: 'Non-Veg', halal: 'Halal' },
      { id: 'd5', name: 'Dal Tadka', diet: 'Veg', halal: 'Halal' }
    ]
  },
  {
    id: 'r3',
    name: 'Classic Grill',
    tags: ['Non-Veg', 'Non-Halal'],
    dishes: [
      { id: 'd6', name: 'Pork Ribs', diet: 'Non-Veg', halal: 'Non-Halal' },
      { id: 'd7', name: 'Margherita Pizza', diet: 'Veg', halal: 'Non-Halal' }
    ]
  }
];

// Utility: matches requested filters
function matchesFlags(item, diet, halal) {
  const dietOk = !diet || item.diet.toLowerCase() === diet.toLowerCase();
  const halalOk = !halal || item.halal.toLowerCase() === halal.toLowerCase();
  return dietOk && halalOk;
}

/**
 * GET /api/restaurants
 * Optional query:
 *   diet=Veg|Non-Veg
 *   halal=Halal|Non-Halal
 *   withDishes=true (include dishes filtered by the same flags)
 */
router.get('/restaurants', (req, res) => {
  const diet = req.query.diet;      // e.g. "Veg" or "Non-Veg"
  const halal = req.query.halal;    // e.g. "Halal" or "Non-Halal"
  const withDishes = String(req.query.withDishes || 'false') === 'true';

  const filtered = restaurants
    .filter(r => {
      if (!diet && !halal) return true;
      // if filtering restaurants, keep ones that have at least one matching dish
      return r.dishes.some(d => matchesFlags(d, diet, halal));
    })
    .map(r => {
      if (!withDishes) return { id: r.id, name: r.name, tags: r.tags };
      return {
        id: r.id,
        name: r.name,
        tags: r.tags,
        dishes: r.dishes.filter(d => matchesFlags(d, diet, halal))
      };
    });

  res.json({ count: filtered.length, items: filtered });
});

/**
 * GET /api/dishes
 * Optional query: diet=Veg|Non-Veg & halal=Halal|Non-Halal
 */
router.get('/dishes', (req, res) => {
  const diet = req.query.diet;
  const halal = req.query.halal;
  const all = restaurants.flatMap(r => r.dishes.map(d => ({ ...d, restaurantId: r.id, restaurant: r.name })));
  const filtered = all.filter(d => matchesFlags(d, diet, halal));
  res.json({ count: filtered.length, items: filtered });
});
