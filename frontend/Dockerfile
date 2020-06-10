# Stage 1: Builder
FROM node:12.16.3-alpine as builder

RUN mkdir /base
WORKDIR /base

COPY package*.json /base/

RUN npm install

COPY . /base

RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /base/nginx.conf /etc/nginx/conf.d/default.conf

# Copy dist files from builder stage
COPY --from=builder /base/dist/frontend/ /usr/share/nginx/html

EXPOSE 4200