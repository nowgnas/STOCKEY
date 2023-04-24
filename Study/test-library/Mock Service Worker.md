# Mock Service Worker

- Purpose:
  
  - intercept network calls
  
  - return specified responses

- Prevents network calls during tests

- Set up test conditions using server response



- SetUp
  
  - `npm install msw`
  
  - 핸들러 생성
    
    - 특정한 URL과 라우트에 무엇을 반환할지 결정
  
  - 테스트 서버 생성
    
    - 요청을 처리할 서버 생성



- 핸들러
  
  - `rest.get('http://localhost:3030/sccops,(req, res, ctx)=>{})`

Handler Type: rest or graphql

HTTP method to mock: get, post, etc...


