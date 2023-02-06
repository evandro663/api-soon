FROM node:alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . . 

EXPOSE 3001

RUN npx tsc

CMD ["npm","run","dev"]
