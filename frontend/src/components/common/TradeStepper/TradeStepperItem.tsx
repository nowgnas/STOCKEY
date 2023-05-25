import styled from "styled-components"
import { shimmer } from "../../../Keyframes"
import dayjs, { Dayjs } from "dayjs"

interface Props {
  time: number
  nextTime: Dayjs
}

interface TimeDivProps {
  isTimeOver: boolean
}

const TradeStepperItem = ({ time, nextTime }: Props) => {
  const isBeforeAfter = (time: number) => {
    const thisTime = dayjs().hour(time).startOf("hour")
    return thisTime.isAfter(nextTime)
  }

  const nextHour = Number(nextTime.format("H"))

  return (
    <>
      {time === nextHour ? (
        <TimeSection>
          <TimeText>{time}시</TimeText>
          <NextTimeDiv isTimeOver={isBeforeAfter(time)} />
        </TimeSection>
      ) : (
        <TimeSection>
          <TimeText>{time}시</TimeText>
          <TimeDiv isTimeOver={isBeforeAfter(time)} />
        </TimeSection>
      )}
    </>
  )
}

export default TradeStepperItem

const TimeSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 8%;
  z-index: 2;

  @media (max-width: 500px) {
    height: 50%;
    width: 12%;
  }
`

const TimeText = styled.p`
  display: flex;
  font-size: 12px;
  font-weight: bold;
  heigth: 20%;
  margin: 0;

  @media (max-width: 500px) {
    font-size: 8px;
  }
`

const TimeDiv = styled.div<TimeDivProps>`
  background: ${(props) =>
    props.isTimeOver ? "var(--custom-green-4)" : "#D9D9D9"};
  border-radius: 50%;
  height: 80%;
  width: 100%;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.3);
`

const NextTimeDiv = styled(TimeDiv)`
  background: var(--custom-green-1);
  animation: ${shimmer("var(--custom-green-2)")} 1s infinite;
`
