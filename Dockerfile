FROM node:12.16.3-alpine

WORKDIR /usr/local/
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.2/wait /wait

COPY package*.json .nvmrc /usr/local/

RUN npm install

COPY src /usr/local/src

EXPOSE 8080
ENV NODE_ENV development

RUN chmod +x /wait

CMD  /wait && npm run start:dev
