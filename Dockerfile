FROM node:16.17.0
WORKDIR /usr/src/nots_dashboard_app/
ENV PATH="./node_modules/.bin:$PATH"
COPY . /usr/src/nots_dashboard_app/
RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT [ "node", "./server/server.js" ]