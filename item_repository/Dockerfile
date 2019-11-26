FROM node:erbium

WORKDIR /code

COPY package.json package.json
#install npm packages
RUN npm install

COPY database.js database.js

COPY app.js app.js

CMD node app.js