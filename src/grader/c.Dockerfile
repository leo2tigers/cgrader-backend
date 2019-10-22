FROM ubuntu:latest
RUN apt-get -y update && apt-get install -y
RUN apt-get install build-essential -y
WORKDIR /grader
COPY ./tests ./tests
COPY ./run.sh ./run.sh
RUN chmod +x run.sh
COPY ./src.c ./src.c
RUN gcc -o src src.c -w -O2
CMD [ "bash", "./run.sh" ]