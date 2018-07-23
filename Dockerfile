FROM openjdk:8-jre-alpine
CMD java -jar /app.war
EXPOSE 8080
ADD /target/myfinancialmanager-0.0.1-SNAPSHOT.war /app.war