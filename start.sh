echo "Stopping containers"
docker-compose down

echo "Removing images"
docker rmi bnoeson/myfinancialmanager

echo "Starting containers"
docker-compose up