# Use the official Node.js base image with the version matching your project requirements
FROM node:16

# Create app directory (this is the directory your app will live inside the container)
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Rebuild bcrypt
RUN npm rebuild bcrypt

# Your app binds to port 3000 by default, use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3030

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "src/server.js" ] 
