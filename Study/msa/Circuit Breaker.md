## MicroSErvice 통신 시 연쇄 오류 발생!

- UserSerrvice 문제가 아니라도 500에러가 발생하면 안됨

![Untitled](https://user-images.githubusercontent.com/62232531/235100658-1ae4e35a-49dc-442e-82c0-0afb04b618f9.png)

- 임시로 에러 발생시 에러를 대체할 수 있는 default값, 다른 데이터를 보여줘야 함

![Untitled](https://user-images.githubusercontent.com/62232531/235100727-a4161f90-ac45-4236-bb23-27cfdd99a0a8.png)

### 문제가 생겼던 function을 갖고오지 않음

# CircuitBreaker

- 장애가 발생하는 서비스에 반복적인 호출이 되지 않도록 차단
- 특정 서비스가 정상적으로 동작하지 않을 경우 다른 기능으로 대체 수행

![Untitled](https://user-images.githubusercontent.com/62232531/235100800-e793a2c1-5863-46c8-950d-444760d45df8.png)

- `closed`
    - 문제 없음
- `open`
    - 문제 발생
    - 우회하는 값으로 리턴

![Untitled](https://user-images.githubusercontent.com/62232531/235100854-522b0e9b-79d0-4590-871d-2087031648c3.png)

CircuitBreaker 툴

- Hystrix ⇒ Resilience4j

## Resilience4J

- 경량화
- fault tolerance
- 함수형 프로그래밍 지원

### 의존관계 추가



- failureRateThreShold
    - CircuitBreaker 열지 결정하는 failure rate percentage 4
- waitDurationInOpnState
    - Open한 상태를 유지하는 지속 기간
- slidingWindowType
    - 닫힐 때 통화 결과를 기록하는 데 사용되는 슬라이딩 창으 ㅣ유형 구성
    - 카운트 기반 or 시간 기반
- slidingWindowSize
    - 호출 결과를 기록ㄷ하는데 사용되는 슬라이딩 창의 크기

TimeLimiter

- future supplier의 time limit을 정하는 api
- default : 1초