# backend/Dockerfile
FROM node:20-alpine

# Create app dir
WORKDIR /app

# -----------------------------
# 1) Install dependencies
# -----------------------------
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps || npm install

# -----------------------------
# 2) Copy source
# -----------------------------
COPY . .

# -----------------------------
# 3) Build TypeScript
# -----------------------------
RUN npm run build

# -----------------------------
# 4) Runtime config
# -----------------------------
ENV PORT=4000
EXPOSE 4000

# -----------------------------
# 5) Start server
# -----------------------------
CMD ["node", "dist/index.js"]
