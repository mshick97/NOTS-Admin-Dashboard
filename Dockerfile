FROM node:16-alpine
WORKDIR /home/usr/src
# one of the dependencies uses node-gyp which needs python, so this run command prevents errors when using alpine (daemon has python, alpine doesn't)
RUN apk add g++ make py3-pip
# first and second copy statements leverage Docker caching. Instead of npm installing every time there is a change in the source code, don't have to fresh install modules every time. Much more efficient - unless of course make a change in either of these package*.json files
COPY package-lock.json package.json ./
RUN npm ci
COPY . .
RUN npm run build
# This server is generally running on port 3000, want to build (docker build -t nots .) and then run (docker run --init --rm -p 3000:3000 nots) to most efficiently start server. Leaving in EXPOSE 3000 as indictator
EXPOSE 3000
# Have to comment out turnary operator in index.js file for server to listen for traffic on port 3000
ENTRYPOINT [ "node", "./functions/index.js" ]