FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps || npm install

COPY . .

# --- DEBUG: show what file Docker is actually compiling ---
RUN echo "=== DEBUG: ls -R ===" && ls -R
RUN echo "=== DEBUG: first 80 lines of src/index.ts ===" && \
    node -e "console.log(require('fs').readFileSync('src/index.ts','utf8').split('\n').slice(0,80).join('\n'))"
RUN echo "=== DEBUG: package.json ===" && cat package.json

# Build
RUN npm run build

EXPOSE 4000
CMD ["node", "dist/index.js"]
