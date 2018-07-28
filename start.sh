echo "Stopping containers"
docker-compose stop myfinancialmanager
docker-compose stop myfinwebapp
docker-compose rm -f myfinancialmanager
docker-compose rm -f myfinwebapp

echo "Removing images"
docker rmi bnoeson/myfinancialmanager
docker rmi bnoeson/myfinwebapp

echo "Starting containers"
docker-compose up