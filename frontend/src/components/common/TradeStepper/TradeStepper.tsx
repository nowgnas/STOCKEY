import styled from "styled-components"
import dayjs from "dayjs"
import { useRecoilValue } from "recoil"

import TradeStepperItem from "./TradeStepperItem"
import {
  currentTimeState,
  nextTradeTimeState,
} from "../../../stores/TradeAtoms"

interface LineProps {
  nowHour: number
}

const TradeStepper = () => {
  // 현재 시간 가져오기
  const now = useRecoilValue(currentTimeState)
  const nowHour = Number(now.format("H"))

  const nextTime = useRecoilValue(nextTradeTimeState)
  const nextHour = nextTime.format("H")

  // 더미데이터 -> 시간별 거래 내역 여부까지 가져오기 (API통신)
  const TIMES = [9, 10, 11, 12, 13, 14, 15]
  return (
    <Container>
      <Header>
        {nowHour > 7 && nowHour < 15
          ? `지금 ${nextHour}시 거래 주문이 진행 중이에요!`
          : "장이 마감되었습니다."}
      </Header>
      {nowHour > 7 && nowHour < 15 ? (
        <BodyText>{nextHour}시 전까지 주문서 제출을 완료해주세요.</BodyText>
      ) : (
        ""
      )}
      <TimeWrapper>
        <Line nowHour={nowHour} />
        {TIMES.map((time, index) => (
          <TradeStepperItem
            key={`TradeStepperItem-${index}`}
            time={time}
            nextTime={nextTime}
          />
        ))}
      </TimeWrapper>
    </Container>
  )
}

export default TradeStepper

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0px;
`

const Header = styled.p`
  font-size: 36px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`
const BodyText = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #6d6666;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const TimeWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 5% 0 5%;
  align-items: center;
  width: auto;
  height: 10rem;
`

const Line = styled.div<LineProps>`
  position: absolute;
  margin-top: 1%;
  background: ${(props) =>
    `linear-gradient(to right,#D9D9D9 0% ${
      ((props.nowHour - 8) / 6) * 100
    }%, var(--custom-green-4) ${((props.nowHour - 8) / 6) * 100}%)`};
  width: 80%;
  height: 0.5%;
  z-index: 1;

  @media (max-width: 500px) {
    margin-top: 5%;
  }
`
