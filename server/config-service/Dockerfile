FROM arm64v8/openjdk:11-jdk AS builder
WORKDIR /app
COPY server/config-service/gradlew .
COPY server/config-service/gradle gradle
COPY server/config-service/build.gradle .
COPY server/config-service/settings.gradle .
COPY server/config-service/src src
RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar

FROM arm64v8/openjdk:11-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", \
        "-Dspring.profiles.active=${PROFILE}", \
        "-Dencrypt.key=${ENCRYPT}", \
        "/app/app.jar"]