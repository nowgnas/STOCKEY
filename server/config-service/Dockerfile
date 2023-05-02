FROM openjdk:11-jre-slim
VOLUME /tmp
COPY build/libs/config-service-1.0.jar ConfigService.jar

ENTRYPOINT ["java","-jar","ConfigService.jar"]