import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.menuItem.deleteMany();
  await prisma.restaurant.deleteMany();

  const r1 = await prisma.restaurant.create({ data: { name: 'Mumbai Masala', address: 'Via Roma 1, Milano', isVegOnly: false } });
  const r2 = await prisma.restaurant.create({ data: { name: 'Green Leaf Pure Veg', address: 'Via Torino 99, Milano', isVegOnly: true } });

  await prisma.menuItem.createMany({
    data: [
      { restaurantId: r1.id, name: 'Butter Chicken', description: '', priceCents: 1390, diet: 'non_veg', isHalal: true },
      { restaurantId: r1.id, name: 'Chicken Biryani', description: '', priceCents: 1290, diet: 'non_veg', isHalal: true },
      { restaurantId: r1.id, name: 'Paneer Tikka', description: '', priceCents: 1090, diet: 'veg', isHalal: true },
      { restaurantId: r1.id, name: 'Dal Tadka', description: '', priceCents: 890, diet: 'veg', isHalal: true },
      { restaurantId: r1.id, name: 'Pepperoni Pizza', description: '', priceCents: 1190, diet: 'non_veg', isHalal: false },
      { restaurantId: r2.id, name: 'Veg Thali', description: '', priceCents: 990, diet: 'veg', isHalal: true },
      { restaurantId: r2.id, name: 'Chole Bhature', description: '', priceCents: 850, diet: 'veg', isHalal: true }
    ]
  });
  console.log('Seeded');
}

main().finally(()=>prisma.$disconnect());
