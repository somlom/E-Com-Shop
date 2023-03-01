FROM node:alpine

COPY api /app
COPY package.json /app
WORKDIR /app

RUN yarn install

CMD ["yarn","start:container"]