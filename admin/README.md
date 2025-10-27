# Veg/Non‑Veg + Halal Food Delivery (MVP Monorepo)

This is a **starter scaffold** for a Deliveroo‑style app with **Veg / Non‑Veg / Halal / Non‑Halal** stickers and filters.

It includes:
- **Backend (Node + Express + Prisma + PostgreSQL)** — REST API, seed data, filtering endpoints, CORS.
- **Mobile app (Expo React Native)** — Restaurant list, menu view, filter chips.
- **Merchant/Admin mini‑dashboard (Vite + React)** — Add restaurants and dishes.
- **Docker Compose** — PostgreSQL + Backend.

## Quick Start

### 1) Backend + DB (Docker)
```bash
cd backend
cp .env.example .env   # uses docker postgres creds
cd ..
docker compose up -d   # starts postgres + backend
# In a second terminal:
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed           # seed sample data
npm run dev            # local dev (hot reload)
```

Backend: **http://localhost:4000**

### 2) Admin/Merchant Dashboard
```bash
cd admin
npm install
npm run dev
```
Open: **http://localhost:5173**

### 3) Mobile app (Expo)
```bash
cd mobile
npm install
cp .env.example .env
npm run start
```

---

## Structure
```
deliveroo-veg-app/
  admin/   # Vite + React mini dashboard
  backend/ # Node + Express + Prisma
  mobile/  # Expo React Native client
  docker-compose.yml
```
