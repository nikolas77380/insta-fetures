FROM nginx:1.17

MAINTAINER Mykola <nikolaykorzun@gmail.com>

COPY ./build/. /usr/share/nginx/html/.
COPY ./components/insta-fetures/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8888

#CMD ["nginx", "-g", "daemon off;"]
