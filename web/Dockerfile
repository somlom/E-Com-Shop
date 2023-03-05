FROM node:alpine

COPY . /web
WORKDIR /web

RUN yarn install
RUN yarn add serve
RUN yarn build
COPY build /home
CMD ["yarn", "start"]
# CMD ["yarn", "run", "dev"]