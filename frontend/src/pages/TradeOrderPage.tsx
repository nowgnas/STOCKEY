import styled from "styled-components"

import TradeStepper from "../components/common/TradeStepper/TradeStepper"
import TradeBoard from "../components/TradeOrderPage/TradeBoard"
import TradeBanner from "../components/TradeMainPage/TradeBanner"

const TradeOrderPage = () => {
  return (
    <>
      <TradeBanner />
      <Container>
        <TradeStepper />
        <TradeBoard />
      </Container>
    </>
  )
}

export default TradeOrderPage

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 5%;
  gap: 132px;

  @media (max-width: 768px) {
    gap: 48px;
  }
`
