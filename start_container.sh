echo Cleaning old containers
docker system prune -f
echo Done!

echo Starting container
docker-compose build 
docker-compose up
# docker run -it -p 4000:4000 test_container
