FROM node:alpine

COPY . /api
WORKDIR /api

ENV NODE_ENV "production"

RUN yarn install 
RUN yarn build

CMD ["yarn","start"]