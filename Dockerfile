# syntax=docker/dockerfile:1

FROM node:16

ENV NODE_ENV=production

WORKDIR /app

COPY ["./package.json", "./pnpm-lock.yaml*", "./"]

RUN npm install -g pnpm
RUN pnpm install --production

COPY . .

CMD [ "pnpx", "ts-node", "--files", "src/server.ts" ]