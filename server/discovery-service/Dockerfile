FROM openjdk:11-jre-slim
VOLUME /tmp
COPY build/libs/discovery-service-1.0.jar DiscoveryService.jar

ENTRYPOINT ["java","-jar","DiscoveryService.jar"]