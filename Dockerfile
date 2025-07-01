FROM node:18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV PORT=3030
ENV DATABASE_URL=postgres://Illona:Illona55@postgres:5432/eshop

EXPOSE 3030

CMD ["node", "src/server.js"]
