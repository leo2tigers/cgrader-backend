docker build -t grader . > /dev/null
docker run --name grader grader
docker stop $(docker ps -aq --filter="name=grader") > /dev/null
docker rm $(docker ps -aq --filter="name=grader") > /dev/null