const API_BASE = process.env.API_BASE || 'http://localhost:4000/api';

export async function fetchRestaurants(filters={}){
  const params = new URLSearchParams();
  if (filters.veg) params.set('veg','true');
  if (filters.nonveg) params.set('nonveg','true');
  if (filters.halal) params.set('halal','true');
  if (filters.nonhalal) params.set('nonhalal','true');
  const res = await fetch(`${API_BASE}/restaurants?${params.toString()}`);
  return res.json();
}

export async function fetchMenu(restaurantId, filters={}){
  const params = new URLSearchParams();
  if (filters.veg) params.set('veg','true');
  if (filters.nonveg) params.set('nonveg','true');
  if (filters.halal) params.set('halal','true');
  if (filters.nonhalal) params.set('nonhalal','true');
  const res = await fetch(`${API_BASE}/restaurants/${restaurantId}/menu?${params.toString()}`);
  return res.json();
}
