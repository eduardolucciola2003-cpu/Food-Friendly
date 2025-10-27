services:
  # --- Backend API (Express) ---
  - type: web
    name: food-friendly-backend
    runtime: docker
    rootDir: Food-Friendly-minimal-fullstack/backend
    dockerContext: .
    dockerfilePath: Dockerfile
    plan: free
    healthCheckPath: /api/health
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: food-friendly-db
          property: connectionString
      - key: PORT
        value: "4000"
      - key: CORS_ORIGIN
        value: https://food-friendly-admin.onrender.com

  # --- Admin (Vite static site) ---
  - type: web
    name: food-friendly-admin
    runtime: static
    rootDir: Food-Friendly-minimal-fullstack/admin
    buildCommand: npm ci && npm run build
    staticPublishPath: dist
    plan: free

databases:
  - name: food-friendly-db
    plan: free
