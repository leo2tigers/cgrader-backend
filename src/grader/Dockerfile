FROM ubuntu:latest
RUN apt-get -y update && apt-get install -y
RUN apt-get install build-essential -y
WORKDIR /grader
COPY ./test ./test
COPY ./run.sh ./run.sh
RUN chmod +x run.sh
COPY ./src.c ./src.c
CMD [ "bash", "./run.sh" ]