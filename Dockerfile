FROM node:14-alpine3.11

RUN apk update && apk add bash

WORKDIR /usr/app

COPY package.json ./
COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3333

CMD ["yarn", "start:dev"]
