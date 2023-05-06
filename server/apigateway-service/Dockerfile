FROM arm64v8/openjdk:11-jdk AS builder
WORKDIR /app
COPY server/apigateway-service/gradlew .
COPY server/apigateway-service/gradle gradle
COPY server/apigateway-service/build.gradle .
COPY server/apigateway-service/settings.gradle .
COPY server/apigateway-service/src src
RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar

FROM arm64v8/openjdk:11-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", \
        "-Dspring.profiles.active=${PROFILE}", \
        "/app/app.jar"]