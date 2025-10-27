# backend/Dockerfile
FROM node:20-alpine

# Create app dir
WORKDIR /app

# 1) Install deps (works with or without a lockfile)
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps || npm install

# 2) Copy source
COPY . .

# 3) Build TypeScript
RUN npm run build

# 4) Runtime
# Render sets PORT for you; we default to 4000 locally
ENV PORT=4000
EXPOSE 4000

# Start the server
CMD ["node", "dist/index.js"]
