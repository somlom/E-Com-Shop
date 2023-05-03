sudo ufw status
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
sudo ufw status
sudo certbot --nginx -d interecom.de -d www.interecom.de