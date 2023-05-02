FROM arm64v8/openjdk:11-jdk-slim-bullseye AS builder
ENV PROFILE dev
WORKDIR /app
RUN apt-get update && apt-get install -y qemu-user-static
COPY server/discovery-service/gradlew .
COPY server/discovery-service/gradle gradle
COPY server/discovery-service/build.gradle .
COPY server/discovery-service/settings.gradle .
COPY server/discovery-service/src src
RUN update-binfmts --enable qemu-aarch64 && \
    export QEMU_LD_PREFIX=/usr/aarch64-linux-gnu && \
    ./gradlew clean bootJar

FROM arm64v8/openjdk:11-jdk-slim-bullseye
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", \
        "-Dspring.profiles.active=${PROFILE}", \
        "/app/app.jar"]
