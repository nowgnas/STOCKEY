

- zookeeper 실행(kafka)

```jsx
.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
```

- kafka 실행(kafka)

```jsx
.\bin\windows\kafka-server-start.bat .\config\server.properties
```

- topic 목록 실행(kafka)

```jsx
.\bin\windows\kafka-topics.bat --bootstrap-server localhost:9092 --list
```

- connect 실행(confluent)

```jsx
.\bin\windows\connect-distributed.bat .\etc\kafka\connect-distributed.properties
```

- consumer 생성

```jsx
.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic my_topic_users --from-beginning
```

- producer

```jsx
.\bin\windows\kafka-console-producer.bat --bootstrap-server localhost:9092 --topic my_topic_users
```