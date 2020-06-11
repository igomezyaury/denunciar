# Stage 1: Builder
FROM node:12.16.3-alpine as builder

WORKDIR /usr/local/

COPY package*.json /usr/local/

RUN npm install

RUN npm install -g @angular/cli

COPY . /usr/local/

EXPOSE 4200 49153

CMD npm run build && npm run start