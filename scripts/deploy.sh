cd /home/dmitrii
sudo ssh -i digital_ocean root@204.48.22.191 'cd /home && rm -rf E-Com-Shop && git clone https://github.com/somlom/E-Com-Shop.git && cp -r E-Com-Shop/* /home/site && cd /home/site && bash ./scripts/start_container.sh'
cd ~/Dokumente/code/site/api
exit