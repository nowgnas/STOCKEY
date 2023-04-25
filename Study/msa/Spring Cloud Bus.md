# Spring Cloud bus

- 분산 시스템의 노드(MS)를 경량 메시지 브로커(RabbitMQ)와 연결
- 상태 및 구성에 대한 변경사항을 연결된 노드에게 전달(broadcast)

- busRefresh을 하게되면 변경사항을 cloud bus에게 알려주고 broadcast

  - 한 번 호출하면 클라우드 버스에 연결된 서비스에게 전달

### AMQP(Advanced MEssage Queing Protocol)

- 메시지 지, 큐잉, 라우팅, 신뢰성, 보안
- Erlang, RabbitMQ에서 사용

### Kafka 프로젝트

- Apache Software Foundation이 scalar 언어 개발한 오픈 소스 메시지 브로커 프로젝트
- 분산형 스트리밍 플랫폼
- 대용량의 데이터 처리 가능한 메시징 시스템

### RabbitMQ vs Kafka

### RabbitMQ

- 메시지 브로커
- 초당 20+ 메시지를 Consumer에게 전달
- 메시지 전달 보장, 시스템간 메시지 전달
- 브로커, Consumer 중심

### Kafka

- 초당 100k+ 이상의 이벤트 처리
- Pub/Sub, Topic에 메시지 전
- Ack을 기다리지 않고 전달 가능
- producer 중심
