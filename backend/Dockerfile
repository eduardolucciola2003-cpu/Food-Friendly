# backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install deps first (cache)
COPY package*.json ./
RUN npm ci

# Copy code
COPY . .

# Generate prisma client & build
RUN npx prisma generate
RUN npm run build

EXPOSE 4000

# << THIS LINE FIXES YOUR DEPLOY ISSUE >>
CMD ["sh", "-c", "npx prisma migrate deploy || npx prisma db push; node dist/index.js"]
