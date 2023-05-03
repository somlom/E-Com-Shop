FROM node:alpine

COPY . /api
WORKDIR /api

ENV PUBLIC_URL ""
ENV API_URL ""
ENV NODE_ENV "production"

RUN yarn install 
RUN yarn build

CMD ["yarn","start"]