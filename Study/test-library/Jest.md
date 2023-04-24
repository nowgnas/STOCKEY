# Jest

- rendering components into virtual DOM

- 가상 DOM 검색을 도움

- 상호작용하여 요소를 클릭하거나 텍스트를 입력

- 테스트 러너가 필요

- create-react-app에서 기본적으로 제공

- `npm test`

> Jest Watch Mode

- 마지막 커밋 이후 변경 사항에 대해서만 테스트

```js
test('테스트하고자 하는 부분 설', () => {
  render(<App />);
  const linkElement = screen.getByText("Learn React"); // 대소문자 구분 안함 i
  expect(linkElement).toBeInTheDocument();
});
```

# TDD

- 코드 작성 전에 테스트를 작성 테스트에 통과하도록 코드를 작성

- red-green test

# 테스트 유형

1. Unit tests
   
   - 함수나 별개의 React 컴포넌트 코드의 한 유닛 혹은 단위를 테스트
   
   - 다른 코드의 유닛과 상호 작용하는 것을 테스트X

2. Integration tests
   
   - 여러 유닛의 상호작용을 테스트

3. Functional Tests
   
   - 특정 기능을 테스트
   
   - 특정 코드가 아닌 전체적인 기능을 테스트

4. E2E 테스트
   
   - 실제 브라우자가 필요
   
   - Cypress, Selenium



test.only => 이 테스트만 실행
