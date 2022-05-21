FROM node:17.8.0-alpine
WORKDIR /myapp
# RUN apk add git
# RUN git clone -b frontend  https://github.com/haruki-o/atcoder_shojin
COPY ./myapp /myapp
RUN npm install
ENV CI=true
CMD ["npm","start"]
