# backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install deps (cache-friendly)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Generate Prisma client & build TS
RUN npx prisma generate
RUN npm run build

EXPOSE 4000

# Apply schema, then start server
CMD ["sh","-c","npx prisma migrate deploy || npx prisma db push; node dist/index.ts"]
