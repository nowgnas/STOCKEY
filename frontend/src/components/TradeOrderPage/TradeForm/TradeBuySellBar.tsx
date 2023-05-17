import styled from "styled-components"

interface Props {
  buyPop: number
  sellPop: number
}

interface StatusBarProps {
  buyPop: number
  sellPop: number
  sumPop: number
}

const TradeBuySellBar = ({ buyPop, sellPop }: Props) => {
  const sumPop = buyPop + sellPop
  return (
    <StatusBar buyPop={buyPop} sellPop={sellPop} sumPop={sumPop}>
      <StatusText>살래요:{buyPop}</StatusText>
      <StatusText>팔래요:{sellPop}</StatusText>
    </StatusBar>
  )
}

export default TradeBuySellBar

const StatusBar = styled.div<StatusBarProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 3%;
  padding: 0 3% 0 3%;
  background: ${(props) =>
    `linear-gradient(to right,var(--custom-pink-3) 0% ${
      props.sumPop ? (props.buyPop / props.sumPop) * 100 : "30"
    }%, var(--custom-blue) ${
      props.sumPop ? (props.buyPop / props.sumPop) * 100 + 10 : "100"
    }%)`};
  border-radius: 24px;
  width: 100%;
  height: 100%;
`

const StatusText = styled.p`
  color: white;
  font-size: 8px;
  font-weight: bold;
`
