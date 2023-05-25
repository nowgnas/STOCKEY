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
      <Grid item xs={3}>
        <TradeShortcutCard
          title="거래 참여하기"
          navPage="order"
          imageSrc="bill"
          bgColor="--custom-purple-3"
        />
      </Grid>
      <Grid item xs={3}>
        <TradeShortcutCard
          title="내 거래 현황"
          navPage="my"
          imageSrc="moneyBag"
          bgColor="--custom-orange-4"
        />
      </Grid>
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
