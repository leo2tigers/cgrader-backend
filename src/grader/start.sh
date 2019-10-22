docker build -f $1.Dockerfile -t $1-grader . > /dev/null
docker run --name $1-grader $1-grader
docker stop $(docker ps -aq --filter="name=grader") > /dev/null
docker rm $(docker ps -aq --filter="name=grader") > /dev/null