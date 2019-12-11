FROM node:erbium
# Set the working directory to /code
WORKDIR /code
# Copies our local package.json to docker image
COPY package.json package.json
COPY database.js database.json
# Installs package dependencies into docker image
RUN npm install --production
# Copies our local files to the docker working directory
# Copies everyfile as it is.
COPY . .
# Runs the nodejs app
CMD node app.js