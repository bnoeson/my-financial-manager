echo "Stopping containers"
docker-compose down

echo "Removing images"
docker rmi bnoeson/myfinancialmanager
docker rmi bnoeson/myfinwebapp

echo "Starting containers"
docker-compose up