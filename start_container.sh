echo Cleaning old containers
# docker system prune -f
echo Done!

echo Building container
docker build -t test_container . 
echo Done!

echo Starting container
docker run -d --env-file=.env -p 8080:8080 test_container
# docker run -it -p 4000:4000 test_container
