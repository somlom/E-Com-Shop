FROM node:alpine

COPY . /web
WORKDIR /web

ENV API_URL "/api"

RUN yarn install
RUN yarn add serve
RUN yarn build

CMD ["yarn", "start"]