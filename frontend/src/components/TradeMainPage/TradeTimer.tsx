import styled from "styled-components"
import { useRecoilValue, useSetRecoilState } from "recoil"
import {
  currentTimeState,
  timeLeftState,
  timeLeftNumsState,
} from "../../stores/TradeAtoms"
import dayjs from "dayjs"
import { useQueryClient } from "react-query"

const TradeTimer = () => {
  const queryClient = useQueryClient()
  const setCurrentTime = useSetRecoilState(currentTimeState)
  const { hoursLeft, minutesLeft, secondsLeft } = useRecoilValue(timeLeftState)
  const timeLeft = useRecoilValue(timeLeftNumsState)
  if (Math.floor(timeLeft.timeLeft / 1000) === 55) {
    queryClient.invalidateQueries({ queryKey: ["oneMinute"] })
  }

  setTimeout(() => {
    setCurrentTime(dayjs())
  }, 1000)

  return (
    <TimerContainer>
      <TimeBlock>
        <TimeLeft>{hoursLeft}</TimeLeft>
        <TimeUnit>시간</TimeUnit>
      </TimeBlock>
      <TimeBlock>
        <TimeLeft>{minutesLeft}</TimeLeft>
        <TimeUnit>분</TimeUnit>
      </TimeBlock>
      <TimeBlock>
        <TimeLeft>{secondsLeft}</TimeLeft>
        <TimeUnit>초</TimeUnit>
      </TimeBlock>
    </TimerContainer>
  )
}

export default TradeTimer

const TimerContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`

const TimeBlock = styled.div`
  // 레이아웃
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20rem;
  height: 26rem;
  padding: 6rem 0;
  margin-right: 24px;

  // 스타일
  background-color: white;
  border-radius: 24px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  & > p {
    margin: 0;
    font-weight: bold;
  }
`

const TimeLeft = styled.p`
  font-size: 6.4rem;
  color: var(--custom-increase-red);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const TimeUnit = styled.p`
  font-size: 2.4rem;
  color: var(--custom-gray-1);
`
