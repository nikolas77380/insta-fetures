#!/usr/bin/env bash
docker rm -fv insta-fetures
docker run -d -p 8888:8888 --name insta-fetures insta-fetures