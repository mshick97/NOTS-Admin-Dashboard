FROM node:16-alpine
WORKDIR /home/usr/src
# one of the dependencies uses node-gyp which needs python, so this run command prevents errors when using alpine (daemon has python, alpine doesn't)
RUN apk add g++ make py3-pip
# first and second copy statements leverage Docker caching. Instead of npm installing every time there is a change in the source code, don't have to fresh install modules every time. Much more efficient - unless of course make a change in either of these package*.json files
COPY package-lock.json package.json ./
RUN npm ci
COPY . .
ENV ACCESS_TOKEN_SECRET=2329df303847a7a460e643380777e42cda5b3f284e76ef4d99dd5b7dcbab3bfd6735b848efd55ebb3732e82b9d94418196aec550ff7fc5488296f3add7250351
ENV REFRESH_TOKEN_SECRET=376e2d44537571d1635594d1364a56a8a7718771643368907a9542aeeebb73fb59d58459d442edf525746ee03e6216501e0a2adc6bb7609fdab8572c409a5483
ENV MONGO_URI=mongodb+srv://mshick97:C5a915F886!@notscustomerdb.0jqdgpw.mongodb.net/?retryWrites=true&w=majority
ENV WEBFLOW_API_KEY=8440c559cc86a24c3cdf6fb01ad0d10c38bd50947a7f9b2188e086e8cf5f5775
ENV NOTS_HAIR_SITE_ID=6093315d74407812c0b3270c
ENV BCRYPT_SECRET=$2b$05$STdYX9CRyh588uQxwAG4buDz0TehQVqSPjI4ZDzcEHl5c1/CdH1JW
ENV PG_URI=postgresql://postgres:zHqrfDTODqBbTTpb5Kk5@containers-us-west-122.railway.app:7661/railway
ENV PGUSER=postgres
ENV PGPASSWORD=zHqrfDTODqBbTTpb5Kk5
ENV PGHOST=containers-us-west-122.railway.app
ENV PGPORT=7661
ENV PGDATABASE=railway
ENV STRIPE_TEST_KEY=sk_test_51J6Sn2F1fKB7ZMCnYFd3ny2ohze4KuOSrlV9Gn1Wmgugnd5KTKw67qzCDsbCxlBhuN2iaFc5OYoYyOrGyx8U3tP100XLAIuLV6
ENV STRIPE_KEY=getRealKeyMax
RUN npm run build
# This server is generally running on port 3000, want to build (docker build -t nots .) and then run (docker run --init --rm -p 3000:3000 nots) to most efficiently start server. Leaving in EXPOSE 3000 as indictator
EXPOSE 3000
# Have to comment out turnary operator in index.js file for server to listen for traffic on port 3000
ENTRYPOINT [ "node", "./functions/index.js" ]