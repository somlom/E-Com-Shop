FROM node:alpine

COPY . /api
WORKDIR /api

ENV PUBLIC_URL "http://204.48.22.191"
ENV API_URL "http://204.48.22.191/api"
ENV NODE_ENV "production"

RUN yarn install 
RUN yarn build

CMD ["yarn","start"]