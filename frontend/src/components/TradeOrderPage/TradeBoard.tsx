import styled from "styled-components"
import TradeGuideList from "./TradeGuide/TradeGuideList"
import dayjs from "dayjs"
import TradeForm from "./TradeForm/TradeForm"
import { useRecoilValue } from "recoil"
import { currentTimeState } from "../../stores/TradeAtoms"
import PopTradeList from "./PopTradeList"
interface SpeechBubbleProps {
  hour: number
}

const TradeBoard = () => {
  const hour = Number(useRecoilValue(currentTimeState).format("H"))
  // const hour = 10
  return (
    <>
      <Container>
        {hour > 7 && hour < 15 && <SpeechBubble hour={hour} />}
        <TradeGuideList />
        <PopTradeList />
        <TradeForm />
      </Container>
    </>
  )
}

export default TradeBoard

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 5%;
  gap: 36px;

  background: #faf5f7;
  border-radius: 36px;
  min-height: max-content;
`

const SpeechBubble = styled.div<SpeechBubbleProps>`
  position: relative;
  background: #faf5f7;
  border-radius: 0.4em;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: ${(props) => `${((props.hour - 8) / 7) * 100}%`};
    width: 0;
    height: 0;
    border: 6.5rem solid transparent;
    border-bottom-color: #faf5f7;
    border-top: 0;
    margin-top: -9.5rem;

    @media (max-width: 768px) {
      border: 3.5rem solid transparent;
      border-bottom-color: #faf5f7;
      border-top: 0;
      margin-top: -5rem;
    }

    @media (max-width: 500px) {
      border: 2.5rem solid transparent;
      border-bottom-color: #faf5f7;
      border-top: 0;
      margin-top: -3.5rem;
    }
  }
`
