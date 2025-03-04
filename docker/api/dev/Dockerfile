FROM node:22.14.0-alpine

ENV TZ=Europe/Madrid

RUN mkdir -p /srv/app/api
WORKDIR /srv/app/api

COPY package.json package-lock.json ./

RUN npm install
RUN npm install -g @nestjs/cli

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]