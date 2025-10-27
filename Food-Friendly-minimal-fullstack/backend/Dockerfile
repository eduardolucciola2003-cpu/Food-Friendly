FROM node:20-alpine
WORKDIR /app

# Install deps (include dev deps so tsc can run)
COPY package*.json ./
RUN npm install

# Copy the source
COPY . .

# Compile TypeScript -> dist/
RUN npm run build

# Runtime
ENV PORT=4000
EXPOSE 4000

# Start compiled JS, NOT src
CMD ["node", "dist/index.js"]
