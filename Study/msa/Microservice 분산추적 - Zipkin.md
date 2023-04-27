## Zipkin

- Twitter에서 사용하는 분산 환경의 Timing 데이터 수집, 추적 시스템(오픈소스)
- Google Drapper에서 발전, 분산환경에서의 시스템 병목 현상 파악
- Colelctor , Query Service, Databasem WebUI로 구성
- **Span**
    - 하나의 요청에 사용되는 작업의 단위
    - 64 bit unique ID
- **Trace**
    - 트리 구조로 이뤄진 Span 셋
    - 하나의 요청에 대한 같은 Trace ID 발급

## Spring Cloud Sleuth

- 스프링 부트 애플리케이션을 Zipkin과 연동
- 요청 값에 따른 Trace Id, Span ID 부여
- Trace와 Span Ids을 로그에 추가 가능


## Zipkin 설치

```jsx
curl -sSL https://zipkin.io/quickstart.sh | bash  -s
```

### 의존관계 
``` jsx
   implementation group: 'org.springframework.cloud', name: 'spring-cloud-starter-zipkin'
    implementation group: 'org.springframework.cloud', name: 'spring-cloud-starter-sleuth'
```