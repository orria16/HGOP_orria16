FROM node:dubnium
# Set the working directory to /code
WORKDIR /code
# Copies our local package.json to docker image
COPY package.json package.json
COPY package-lock.json package-lock.json
# Installs package dependencies into docker image
RUN npm install --production
# Copies our local files to the docker working directory
# Copies everyfile as it is.
COPY . .
# Runs the nodejs app
CMD sleep 5 && npm run migratedb:pg && node app.js