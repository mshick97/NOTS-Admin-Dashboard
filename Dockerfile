FROM node:16.17.0
WORKDIR /home/usr/src
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm ci
RUN npm run build
# This server is generally running on port 3000, want to build (docker build -t nots .) and then run (docker run --init --rm -p 3000:3000 nots) to most efficiently start server. Leaving in EXPOSE 3000 as indictator
EXPOSE 3000
ENTRYPOINT [ "node", "./functions/index.js" ]