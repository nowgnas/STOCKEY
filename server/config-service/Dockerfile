FROM arm64v8/openjdk:11-jdk AS builder
WORKDIR /app
COPY S08P31A205/server/config-service/gradlew .
COPY S08P31A205/server/config-service/gradle gradle
COPY S08P31A205/server/config-service/build.gradle .
COPY S08P31A205/server/config-service/settings.gradle .
COPY S08P31A205/server/config-service/src src
RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar

FROM arm64v8/openjdk:11-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", \
        "-Dspring.profiles.active=${PROFILE}", \
        "-Dencrypt.key=${ENCRYPT}", \
        "/app/app.jar"]