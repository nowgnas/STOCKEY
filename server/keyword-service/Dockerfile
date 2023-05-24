FROM arm64v8/openjdk:11-jdk AS builder
WORKDIR /app
COPY server/keyword-service/gradlew .
COPY server/keyword-service/gradle gradle
COPY server/keyword-service/build.gradle .
COPY server/keyword-service/settings.gradle .
COPY server/keyword-service/src src
RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar

FROM arm64v8/openjdk:11-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", \
        "-Dspring.profiles.active=${PROFILE}", \
        "/app/app.jar"]
