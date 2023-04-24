`fireEvent`

`$ npm install @testing-library/user-event@^14`

user-event 최신 버전 사용하기



- setup()
  
  - user 객체를 생성하는 함수
  
  - `const user = userEvent.setup()`
  
  - hover, onhover, click 메서드가 포함된다



user-event API는 항상 프로미스를 반환한다.

- await를 사용해야 한다.



```
중요: 오류를 피하기 위한 코드 업데이트
오류를 방지하려면 use-effect를 통한 설치 필요
2023년 2월 16일 기준, 나머지 과정에서 오류를 방지하려면 create-react-app으로 설치를 실행해야 합니다:

npm install @testing-library/react@14 @testing-library/user-event@14 @testing-library/dom@9
자세한 내용에 관심이 있다면 읽어보세요.



상황
다음과 같이, user-event를 사용하는 테스트를 실행할 때 "not wrapped in act(...)" 오류가 많이 나타납니다:


원인
@testing-library/dom v9.0.0 및 @testing-library/react v14.0.0이 2023년 2월 16일에 릴리스되었습니다. create-react-app으로 @testing-library/react 및 @testing-library/user-event 버전이 설치되고, 결과적으로 @testing-library/dom 버전과 충돌을 일으킵니다.


이와 같이 버전이 충돌하여 "not wrapped in act(...)" 경고가 나타납니다.



해결
이 문서 맨 위에서 언급한 것처럼 모든 버전을 맞추려면 새로운 create-react-app 앱의 최상위 수준에서 다음 커맨드를 실행해야 합니다:

npm install @testing-library/react@14 @testing-library/user-event@14 @testing-library/dom@9
이렇게 하면 @testing-library/dom 버전이 서로 일치하게 됩니다(실제 버전 번호는 스크린샷과 다를 수 있음):


```

```
npm install @testing-library/react@14 @testing-library/user-event@14 @testing-library/dom@9
```


