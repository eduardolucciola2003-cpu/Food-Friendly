# ---- Build stage: install dev deps and compile TS ----
FROM node:20-alpine AS build
WORKDIR /app

# Install deps (include dev deps for TypeScript & @types)
COPY package.json package-lock.json* ./
RUN npm ci --include=dev || npm install --include=dev

# Copy source and build
COPY . .
RUN npm run build

# ---- Runtime stage: production image with compiled JS ----
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Install only production deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev

# Bring in compiled JS only
COPY --from=build /app/dist ./dist

# Render will set PORT; keep 4000 as local default
ENV PORT=4000
EXPOSE 4000
CMD ["node", "dist/index.js"]
