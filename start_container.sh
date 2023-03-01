echo Cleaning old containers
docker system prune -f
echo Done!

echo Building container
docker build -t test_container . 
echo Done!

echo Starting container
docker run -it --env-file=.env  -p 4000:4000 test_container
