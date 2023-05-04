ARG GIT_REPO
ARG GIT_BRANCH
ARG GITLAB_USERNAME
ARG GITLAB_PERSONAL_ACCESS_TOKEN

RUN git clone -b ${GIT_BRANCH} https://${GITLAB_USERNAME}:${GITLAB_PERSONAL_ACCESS_TOKEN}@lab.ssafy.com/s08-final/${GIT_REPO}.git && \
    cd ${GIT_REPO}
FROM arm64v8/openjdk:11-jdk AS builder
ENV PROFILE dev
WORKDIR /app
COPY server/discovery-service/gradlew .
COPY server/discovery-service/gradle gradle
COPY server/discovery-service/build.gradle .
COPY server/discovery-service/settings.gradle .
COPY server/discovery-service/src src
RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar

FROM arm64v8/openjdk:11-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", \
        "-Dspring.profiles.active=${PROFILE}", \
        "/app/app.jar"]