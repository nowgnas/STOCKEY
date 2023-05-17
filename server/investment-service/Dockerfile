# Build stage
FROM adoptopenjdk:17-jdk-hotspot AS builder
WORKDIR /app
COPY server/investment-service/gradlew .
COPY server/investment-service/gradle gradle
COPY server/investment-service/build.gradle .
COPY server/investment-service/settings.gradle .
COPY server/investment-service/src src
RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar --no-daemon

# Final stage
FROM adoptopenjdk:17-jdk-hotspot
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", \
        "-Dspring.profiles.active=${PROFILE}", \
        "/app/app.jar"]
