## API-BENCHMARK
It's a dockerized tool to load test APIs. Build the image from Dockerfile. Once image is built successfully launch the container either with `docker-compose` file or following command:

    docker run --name benchmarker -it -dp 8096:8096 -v `pwd`/test-script:/api-benchmark/test-script api-benchmark

You can start load-testing your APIs either from inside or outside of the container. Once container is launched execute either one of the following

1. Commands:

    Get inside the container

    `$ docker exec -it benchmarker /bin/sh`

    Run the test

    `$ /api-benchmark/start-test.js`


2. Command:

    Run the test

    `docker exec benchmarker node ./test-script/start-test.js`

Number of endpoints to be added and configured with heavy traffic are listed in `start-test.js` file.

Reports of API load test are browsable through `http://<container_host_ip>:8096`

## LICENSE
[MIT](./LICENSE/)
