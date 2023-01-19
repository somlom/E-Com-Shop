echo "Building app.."
npm run build

echo "Deploying files over SSH"
scp -r build/* pi@192.168.178.54:/var/www/192.168.178.54/

echo "Done!"