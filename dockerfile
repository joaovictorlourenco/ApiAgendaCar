FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && npx prisma generate && npx prisma migrate dev

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]