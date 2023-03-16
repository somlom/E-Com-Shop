echo Cleaning old containers
docker system prune -f
echo Done!

echo Starting container
docker-compose build 
docker-compose up -d
docker ps