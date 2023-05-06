echo Cleaning old containers
docker compose rm
docker system prune -f
docker system prune -a --volumes
docker builder prune -a 
docker buildx prune -a 
echo Done!

echo Starting container
docker buildx bake
docker-compose up --build -d
# docker-compose restart
# docker compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d interecom.de
docker ps