echo "Stopping containers"
docker-compose stop myfinancialmanager
docker-compose stop myfinwebapp
docker-compose rm -f myfinancialmanager
docker-compose rm -f myfinwebapp