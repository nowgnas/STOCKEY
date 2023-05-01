import styled from "styled-components"
import TradeShortcutList from "../components/TradeMainPage/TradeShortcutList"

const TradeMainPage = () => {
  return (
    <Container>
      <TradeShortcutList />
    </Container>
  )
}

export default TradeMainPage

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 5%;
`
