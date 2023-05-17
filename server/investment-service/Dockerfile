# Build stage
FROM arm64v8/openjdk:17-ea-16-jdk AS builder
# Update package list and install xargs
RUN opkg update && opkg install xargs
WORKDIR /app
COPY server/investment-service/gradlew .
COPY server/investment-service/gradle gradle
COPY server/investment-service/build.gradle .
COPY server/investment-service/settings.gradle .
COPY server/investment-service/src src
RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar --no-daemon

# Final stage
FROM arm64v8/openjdk:17-ea-16-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", \
        "-Dspring.profiles.active=${PROFILE}", \
        "/app/app.jar"]
