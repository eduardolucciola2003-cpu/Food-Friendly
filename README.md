# Food Friendly (Minimal Upload Pack)

This is a minimal working version to upload into GitHub and deploy quickly on Render.

## Structure
- backend/ — Express API with /live, /api/health, /api/restaurants, /api/restaurants/:id/menu, /api/auth/guest
- admin/ — Vite React admin placeholder
- mobile/ — Expo client fetching restaurants from API
- rider/ — Expo rider placeholder
- deploy/render.yaml — Render blueprint

## Run (local)
cd backend && npm install && npm run dev

## Deploy (Render)
Use deploy/render.yaml as a Blueprint.
