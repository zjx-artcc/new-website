# syntax=docker/dockerfile:1

ARG NODE_VERSION=21.5.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install --production

RUN npm i -g prisma

RUN prisma generate

RUN yarn build

USER node

CMD node ./build/index.js