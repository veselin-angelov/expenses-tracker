FROM node:lts-slim AS builder

WORKDIR /usr/src/

COPY package.json yarn.lock ./

RUN corepack enable
RUN NODE_ENV=production yarn install && yarn cache clean

COPY . /usr/src/

RUN yarn build

FROM node:lts-slim

RUN mkdir /app

COPY --from=builder /usr/src/dist /app/dist
COPY --from=builder /usr/src/node_modules /app/node_modules

WORKDIR /app

EXPOSE 3000
CMD ["node", "dist/main"]
