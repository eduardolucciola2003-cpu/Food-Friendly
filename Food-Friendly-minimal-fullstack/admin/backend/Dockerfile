FROM node:20-alpine
WORKDIR /app

# install deps (keep dev deps so tsc can run)
COPY package*.json ./
RUN npm install

# copy source
COPY . .

# compile TS -> dist/
RUN npm run build

ENV PORT=4000
EXPOSE 4000

# start compiled JS
CMD ["npm","start"]
