import styled from "styled-components"

import TradeShortcutCard from "./TradeShortcutCard"
import { Grid } from "@mui/material"

const TradeShortcutList = () => {
  return (
    <Container
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <TradeShortcutCard status="TRADE" />
      <TradeShortcutCard status="MYTRADE" />
    </Container>
  )
}

export default TradeShortcutList

const Container = styled(Grid)`
  height: 30rem;
  width: 100%;
  gap: 128px;

  @media (max-width: 900px) {
    gap: 32px;
  }
`
