FROM node:16-bullseye-slim

RUN apt-get update -y

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 8081
CMD ["npm", "run", "start"]
