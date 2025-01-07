# syntax=docker/dockerfile:1

ARG NODE_VERSION=21.5.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY . .

COPY .env /usr/src/app/.env

#DEBUG
RUN apk add --no-cache sudo

RUN ls

RUN npm i -g pnpm

RUN pnpm i

RUN npx prisma generate --no-hints

RUN pnpm build

USER node

CMD node ./build/index.js
