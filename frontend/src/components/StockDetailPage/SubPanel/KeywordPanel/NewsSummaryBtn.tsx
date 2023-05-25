import styled from "styled-components"
import { triggerScroll } from "../../../common/Functions/triggerScroll"

interface Props {
  keyphrase: string
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>
  index: number
  className: "selected" | "not-selected"
}

const NewsSummaryBtn = ({
  keyphrase,
  setSelectedIndex,
  index,
  className,
}: Props) => {
  const clickHandler = () => {
    setSelectedIndex(index)

    // NewsSummaryBtn 컴포넌트를 최초로 클릭하는 경우,스크롤이 내려가지 않는 문제 있음
    // 원인
    // NewsList 컴포넌트가 렌더링되기 전에 triggerScroll()이 실행됨
    // 이미 스크롤이 가장 하단에 위치해 있기 때문에 더 내려갈 곳이 없는 것임
    // 해결 방안
    // 백에서 NewsList를 받아와서 렌더링이 완료된 후에 triggerScroll()을 실행하도록 수정
    setTimeout(() => {
      triggerScroll("newsRef")
    }, 100)
  }
  return (
    <BtnDiv className={className} onClick={clickHandler}>
      {keyphrase}
    </BtnDiv>
  )
}

export default NewsSummaryBtn

const BtnDiv = styled.div`
  border-radius: 20px;
  font-size: 2rem;
  font-weight: bold;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &.selected {
    background-color: #b4f3e0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: var(--custom-black);
    font-weight: bolder;
    font-size: 2.2rem;
  }
  &.not-selected {
    background-color: white;
    border: 4px solid #f4eff4;
    color: #979797;
    &:hover {
      color: var(--custom-black);
    }
  }
`
