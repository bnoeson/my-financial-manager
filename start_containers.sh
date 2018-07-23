echo "Stopping containers"
docker-compose down
docker rm myfindb myfinancialmanager

echo "Removing images"
docker rmi bnoeson/myfinancialmanager

echo "Starting containers"
docker-compose up