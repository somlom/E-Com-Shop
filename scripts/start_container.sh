echo Cleaning old containers
docker system prune -f
echo Done!

echo Starting container
docker buildx bake
docker-compose up -d
docker ps