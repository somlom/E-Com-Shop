echo Cleaning old containers
docker system prune -f
echo Done!

echo Starting container
docker buildx bake
# docker-compose up -d
docker compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d interecom.de
docker ps