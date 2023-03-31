cd api
rm -rf node_modules build
cd ../web
rm -rf node_modules build
cd ..
rm -rf node_modules build

cd /home/dmitrii

scp -r -i digital_ocean Dokumente/code/site root@159.89.108.59:/home

ssh -i digital_ocean root@159.89.108.59 'cd /home/site && bash start_container.sh'

cd ~/Dokumente/code/site

cd api
yarn install
cd ../web
yarn install
cd ..
yarn install

exit