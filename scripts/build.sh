#!/usr/bin/env bash

rm -r ./build
docker rm -f insta-fetures-build

docker build -f components/insta-fetures-build/Dockerfile -t insta-fetures-build .

docker run -v $(pwd)/build:/insta-fetures/build --name insta-fetures-build insta-fetures-build

exit_code=$?

if [  "$exit_code" != "0" ]; then
	echo "Build failed"
    return
fi

docker rm -f insta-fetures-build

docker build -f components/insta-fetures/Dockerfile -t insta-fetures .

exit_code=$?

if [  "$exit_code" != "0" ]; then
	echo "Build failed"
else
	echo "Build successful"
fi

exit $exit_code
