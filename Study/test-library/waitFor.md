# waitFor

- 항목이 두 개가 될 때까지 기다리도록 하는 메서드

- 두 개의 alert가 모두 반환되거나 타임아웃(timeout) 제한에 도달할 때까지 테스트를 실행

`import { render, screen, waitFor } from "@testing-library/react";`

```
await waitFor(async () => {

    const alerts = await screen.findAllByRole("alert");

    expect(alerts).toHaveLength(2);

  });
```


