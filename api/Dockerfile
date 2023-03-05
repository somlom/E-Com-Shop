FROM node:alpine

COPY . /api
WORKDIR /api

RUN yarn install 
RUN yarn build

CMD ["yarn","start"]