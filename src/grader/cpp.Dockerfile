FROM ubuntu:latest
RUN apt-get -y update && apt-get install -y
RUN apt-get install build-essential -y
WORKDIR /grader
COPY ./tests ./tests
COPY ./run.sh ./run.sh
RUN chmod +x run.sh
COPY ./src.cpp ./src.cpp
RUN g++ -std=c++11 -o src src.cpp -w -O2
CMD [ "bash", "./run.sh" ]