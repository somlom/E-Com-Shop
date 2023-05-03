FROM node:alpine

COPY . /web
WORKDIR /web

ENV API_URL "/api"
# ENV PUBLIC_URL "http://159.89.108.59"
# ENV API_URL "http://159.89.108.59/api"
ENV NODE_ENV "production"

RUN yarn install
RUN yarn run build

CMD ["yarn", "start"]