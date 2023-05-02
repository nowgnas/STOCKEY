import styled from "styled-components"
import TradeShortcutList from "../components/TradeMainPage/TradeShortcutList"
import TradeStepper from "../components/common/TradeStepper/TradeStepper"

const TradeMainPage = () => {
  return (
    <Container>
      <TradeStepper />
      <TradeShortcutList />
    </Container>
  )
}

export default TradeMainPage

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 5%;
  gap: 132px;

  @media (max-width: 500px) {
    gap: 32px;
  }
`
