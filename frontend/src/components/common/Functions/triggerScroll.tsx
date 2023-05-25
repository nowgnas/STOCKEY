// 특정 요소로 스크롤을 이동하는 함수

export const triggerScroll = (elementId: string) => {
  const scrollRef = document.getElementById(elementId)
  scrollRef?.scrollIntoView({ behavior: "smooth" })
}

// 사용 예시

// import { triggerScroll } from "components/common/Functions/triggerScroll"

// <TargetElement id="targetRef"/>
// <TriggerElement onClick={() => triggerScroll("targetRef")}/>

// 1. TargetElement에 id를 부여합니다.
// 2. TriggerElement에 onClick 속성에 triggerScroll 함수를 넘겨줍니다.
// 3. triggerScroll 함수에 TargetElement의 id를 인자로 넘겨줍니다.
// 4. TriggerElement를 클릭하면 TargetElement로 스크롤이 이동합니다.
