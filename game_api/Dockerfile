FROM node:erbium
# set the working directory to /code
WORKDIR /code
# copies my local package.json to docker image
COPY package.json package.json
#install npm packages dependencies into docker image
RUN npm install

# Copies our local files to the docker working directory
COPY database.js database.js

COPY app.js app.js

# Runs the nodejs app
CMD node app.js