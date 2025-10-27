FROM node:20-alpine
WORKDIR /app

# install deps INCLUDING dev types (for tsc)
COPY package*.json ./
RUN npm install --include=dev --legacy-peer-deps || npm install --include=dev

# copy code and build
COPY . .
RUN npm run build

EXPOSE 4000
CMD ["node", "dist/index.js"]
