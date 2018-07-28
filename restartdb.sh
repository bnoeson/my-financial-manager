echo "Stopping containers"
docker-compose stop myfindb
docker-compose rm -f myfindb

echo "Starting containers"
docker-compose up -d
