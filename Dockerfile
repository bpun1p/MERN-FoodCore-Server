FROM node:latest

RUN mkdir -p /FoodCore-server

COPY ./server /FoodCore-server

WORKDIR /FoodCore-server

RUN npm install

EXPOSE 5000

CMD [ "node", "server.js" ]