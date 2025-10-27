import React, { useEffect, useState } from 'react';
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export default function App(){
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState({ name:'', address:'', isVegOnly:false });
  const [menuForm, setMenuForm] = useState({ restaurantId:'', name:'', priceCents:1000, diet:'veg', isHalal:true });

  async function load(){
    const res = await fetch(`${API_BASE}/restaurants`);
    setRestaurants(await res.json());
  }

  useEffect(()=>{ load(); }, []);

  async function createRestaurant(e){
    e.preventDefault();
    await fetch(`${API_BASE}/restaurants`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(form)
    });
    setForm({ name:'', address:'', isVegOnly:false });
    load();
  }

  async function addMenu(e){
    e.preventDefault();
    await fetch(`${API_BASE}/restaurants/${menuForm.restaurantId}/menu`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name:menuForm.name, priceCents:Number(menuForm.priceCents), diet:menuForm.diet, isHalal:menuForm.isHalal })
    });
    setMenuForm({ restaurantId:'', name:'', priceCents:1000, diet:'veg', isHalal:true });
    load();
  }

  return (
    <div style={{ padding: 24, fontFamily:'ui-sans-serif, system-ui' }}>
      <h1>Veg/Non‑Veg + Halal Admin</h1>

      <h2>Create Restaurant</h2>
      <form onSubmit={createRestaurant} style={{ display:'grid', gap:8, maxWidth:420 }}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input placeholder="Address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} />
        <label><input type="checkbox" checked={form.isVegOnly} onChange={e=>setForm({...form, isVegOnly:e.target.checked})} /> Veg‑only</label>
        <button type="submit">Create</button>
      </form>

      <h2 style={{ marginTop:24 }}>Add Menu Item</h2>
      <form onSubmit={addMenu} style={{ display:'grid', gap:8, maxWidth:420 }}>
        <select value={menuForm.restaurantId} onChange={e=>setMenuForm({...menuForm, restaurantId:e.target.value})} required>
          <option value="">Select restaurant</option>
          {restaurants.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
        <input placeholder="Dish name" value={menuForm.name} onChange={e=>setMenuForm({...menuForm, name:e.target.value})} required />
        <input type="number" placeholder="Price cents" value={menuForm.priceCents} onChange={e=>setMenuForm({...menuForm, priceCents:e.target.value})} />
        <select value={menuForm.diet} onChange={e=>setMenuForm({...menuForm, diet:e.target.value})}>
          <option value="veg">Veg</option>
          <option value="non_veg">Non‑Veg</option>
        </select>
        <label><input type="checkbox" checked={menuForm.isHalal} onChange={e=>setMenuForm({...menuForm, isHalal:e.target.checked})} /> Halal</label>
        <button type="submit">Add Dish</button>
      </form>

      <h2 style={{ marginTop:24 }}>Restaurants</h2>
      <ul>
        {restaurants.map(r => (
          <li key={r.id}>
            <strong>{r.name}</strong> — {r.address} {r.isVegOnly ? ' (Veg‑only)' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
