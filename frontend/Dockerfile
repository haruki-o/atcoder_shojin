FROM node:17.8.0-alpine
WORKDIR /myapp
COPY ./myapp/package*.json /myapp
RUN npm install
EXPOSE 3000
ENV CI=true
