# my-financial-manager

## Installing
1) git clone
2) cd
3) mvn clean install
4) cd frontend
5) ng build

## Running
1) start containers by running "start.sh"
2) develop :
    * backend : build, upload and deploy in the container with <code>mvn clean install -P hot-deploy</code>
    * frontend : start the watch process for building and deploying to docker with <code>npm run start-dev</code>
3) stop containers by running "stop.sh"
