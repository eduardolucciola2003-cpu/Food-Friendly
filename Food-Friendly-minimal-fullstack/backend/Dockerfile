# backend/Dockerfile
FROM node:20-alpine

# Create app dir
WORKDIR /app

# -----------------------------
# 1) Install dependencies
#    (works with or without a lockfile)
# -----------------------------
# Copy only package manifests first for better layer caching
COPY package.json package-lock.json* ./

# Prefer npm install (ci requires an exact lockfile)
# Fallback ensures builds don’t fail on older npm/lockfile combos
RUN npm install --legacy-peer-deps || npm install

# -----------------------------
# 2) Copy source
# -----------------------------
COPY . .

# -----------------------------
# 3) Generate Prisma client & build TypeScript
# -----------------------------
RUN npx prisma generate
RUN npm run build

# -----------------------------
# 4) Runtime config
# -----------------------------
ENV PORT=4000
EXPOSE 4000

# Apply migrations (or push in dev) then start server
CMD sh -c "npx prisma migrate deploy || npx prisma db push; node dist/index.js"
