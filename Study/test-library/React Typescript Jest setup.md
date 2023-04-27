# React Typescript Jest setup

```
 "devDependencies": {
    //--default--
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    //----------
    "@babel/preset-typescript": "^7.15.0",
    "@types/jest": "^27.0.2",
    "jest": "^27.3.1",
    "react-test-renderer": "^17.0.2",
  },
```

npm install하기

## babel config typescript 설정

> npm add --dev @babel/preset-typescript @types/jest

***.babelrc***

```
{
  "presets": [
    ["@babel/preset-env", { "targets": { "node": "current" } }],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```

### jest config 생성

`jest.config.js`

```
const config = {
  verbose: true, //실행 중에 각 개별 테스트를 보고해야 하는지 여부
  rootDir: "", 
  //Jest가 테스트와 모듈을 스캔해야 하는 루트 디렉터리
  testEnvironment: "jsdom",
  //테스트에 사용할 테스트 환경
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\\/]+$"],
  // 파일 경로 가 패턴 과 일치 하면 변환되지 않습니다.
  coveragePathIgnorePatterns: ["src/components/index.ts"],
  // 파일 경로가 패턴 중 하나와 일치하면 적용 범위 정보를 건너뜁
};

module.exports = config;
```
