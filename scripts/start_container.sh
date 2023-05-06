echo Cleaning old containers
docker compose down
docker compose rm
docker system prune -f
docker system prune -a --volumes
docker builder prune -a 
docker buildx prune -a 
docker image prune -a
# docker-compose pull
echo Done!

echo Starting container
docker buildx bake --no-cache	
docker-compose up --build -d
docker-compose restart
docker ps