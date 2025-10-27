FROM node:20-alpine

WORKDIR /app

# Install deps (works with or without a lockfile)
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps || npm install

# Copy source
COPY . .

# Prisma + build
RUN npx prisma generate
RUN npm run build

EXPOSE 4000
ENV PORT=4000

# Apply migrations, then start
CMD sh -c "npx prisma migrate deploy || npx prisma db push; node dist/index.js"
