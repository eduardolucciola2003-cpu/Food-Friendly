# backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# 1) Install deps (include devDeps so tsc can run)
COPY package*.json ./
RUN npm install

# 2) Copy source
COPY . .

# 3) Build TypeScript -> dist/
RUN npm run build

# 4) Runtime
ENV PORT=4000
EXPOSE 4000

# 5) Start compiled JS (NOT src)
CMD ["node", "dist/index.js"]
