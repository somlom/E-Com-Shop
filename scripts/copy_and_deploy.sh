cd api
rm -rf node_modules build
cd ../web
rm -rf node_modules build
cd ..
rm -rf node_modules build
 
cd /home/dmitrii
scp -r -i digital_ocean Dokumente/code/site root@204.48.22.191:/home

cd ~/Dokumente/code/site/api
yarn install
cd ../web
yarn install
cd ..
yarn install
pwd
bash scripts/deploy.sh

exit