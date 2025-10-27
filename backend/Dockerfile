# backend/Dockerfile
FROM node:20-alpine

# 1) App dir
WORKDIR /app

# 2) Install deps (works with or without a lockfile)
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps || npm install

# 3) Copy source
COPY . .

# 4) Build TypeScript
RUN npm run build

# 5) Runtime
ENV PORT=4000
EXPOSE 4000

CMD ["node", "dist/index.js"]
