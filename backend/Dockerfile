FROM node:20-alpine
WORKDIR /app

# install only what's needed at runtime
COPY package*.json ./
RUN npm install --production=false

# copy the rest
COPY . .

ENV PORT=4000
EXPOSE 4000

# ⬇️ run JS entry (no dist/)
CMD ["node", "index.js"]
