FROM arm64v8/openjdk:11-jdk AS builder
WORKDIR /app
COPY server/favorite-service/gradlew .
COPY server/favorite-service/gradle gradle
COPY server/favorite-service/build.gradle .
COPY server/favorite-service/settings.gradle .
COPY server/favorite-service/src src
RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar

FROM arm64v8/openjdk:11-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", \
        "-Dspring.profiles.active=${PROFILE}", \
        "/app/app.jar"]
