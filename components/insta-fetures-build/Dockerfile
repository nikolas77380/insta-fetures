FROM node:12.14.1

MAINTAINER Mykola <nikolaykorzun@gmail.com>

RUN npm install -g create-react-app

WORKDIR /insta-fetures

COPY ./package.json /insta-fetures
COPY ./package-lock.json /insta-fetures

RUN npm install

COPY ./ /insta-fetures

CMD npm run build