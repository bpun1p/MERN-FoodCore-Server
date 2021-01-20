FROM node:latest

ENV MONGO_DB_USERNAME=bpun1p \
    MONGO_DB_PWD=Guy123su

RUN mkdir -p /FoodCore-server

COPY ./server /FoodCore-server

WORKDIR /FoodCore-server

RUN npm install

EXPOSE 5000

CMD [ "node", "server.js" ]