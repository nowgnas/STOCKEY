import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import PriceTag from "./PriceTag"
import StockName from "./StockName"

interface Props {
  price: number
  rate: number
  name: string
  stockId: number
}

interface BarProps {
  rate: number
}

const StockGraphBar = ({ price, rate, name, stockId }: Props) => {
  const [isHover, setIsHover] = useState<boolean>(false)
  const navigate = useNavigate()

  // handle hovering
  const handleMouseOver = () => {
    setIsHover(true)
  }

  const handleMouseOut = () => {
    setIsHover(false)
  }

  // handle Click
  const handleClick = () => {
    navigate(`/stock/${stockId}`)
  }

  return (
    <>
      <Wrapper onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <PriceTag price={price} isHover={isHover} />
        <GraphBarDiv onClick={handleClick}>
          <RateBar
            rate={rate}
            className={rate >= 0 ? "increase" : "decrease"}
          />
          <RateDiv className={rate >= 0 ? "increase" : "decrease"}>
            {rate >= 0 ? "▲" : "▼"}
            {Math.round(rate * 100) / 100}%
          </RateDiv>
        </GraphBarDiv>
        <StockName name={name} />
      </Wrapper>
    </>
  )
}

export default StockGraphBar

// bar 증가 애니메이션
const IncreaseAnime = (len: number) => keyframes`
  0% {
    height: 0px;
  }
  100% {
    height: ${(Math.abs(len) * 100) / 15}%
  }
`

// bar요소(bar, name, price tag) 세로 정렬
const Wrapper = styled.div`
  // flex-box
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

// bar 검정 배경
const GraphBarDiv = styled.div`
  // position
  position: relative;

  // size
  height: calc(50vh - 200px);
  min-width: 80px;

  // color
  background-color: var(--custom-black);

  // border
  border-radius: 18px 18px 18.2px 18.2px;

  // flex-box
  display: flex;
  flex-direction: column-reverse;
  justify-content: end;
  align-items: center;

  // transition
  transition: all 0.2s ease-in-out;

  // cursor
  cursor: pointer;

  // hover
  &:hover {
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3);
  }
`

// 칠해지는 bar
const RateBar = styled.div<BarProps>`
  // size
  width: 100%;
  height: 0%;

  // border
  border-radius: 0px 0px 18px 18px;

  &.increase {
    background: var(--custom-gradient-pink);
  }
  &.decrease {
    background: linear-gradient(161.04deg, #8e6eeb 0%, #37c3ff 100%);
  }

  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5);

  // animation
  animation: ${(props) => IncreaseAnime(props.rate)} 1s 0s forwards ease-in-out;
`

// rate text
const RateDiv = styled.div`
  font-size: 1.6rem;
  font-weight: bold;

  &.increase {
    background: var(--custom-gradient-pink);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  &.decrease {
    background: linear-gradient(161.04deg, #8e6eeb 0%, #37c3ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`
