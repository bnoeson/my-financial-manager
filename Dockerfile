FROM openjdk:8-jre-alpine
CMD java -jar /app.jar
EXPOSE 8080
ADD /target/myfinancialmanager-0.0.1-SNAPSHOT.jar /app.jar