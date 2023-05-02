import styled from "styled-components"

import TradeFormBalance from "./TradeFormBalance"
import Grid from "@mui/material/Grid"
import TradeStockList from "./TradeStockList"
import TradeBasketList from "./TradeBasketList"
const DUMMYDATA = [
  { name: "naver", nums: 7, currentPrice: 230000 },
  { name: "LG유플러스", nums: 7, currentPrice: 32000 },
  { name: "S-Oil", nums: 7, currentPrice: 89990 },
  { name: "LG화학", nums: 7, currentPrice: 230000 },
  { name: "기아", nums: 7, currentPrice: 32000 },
  { name: "삼성전자", nums: 7, currentPrice: 89990 },
]
const TradeForm = () => {
  return (
    <>
      <Header>주문서 작성하기</Header>
      <TradeFormContainer container columns={13}>
        <TradeFormWrapper item direction="column" md={6}>
          <TradeFormBalance />
          <TradeStockList />
        </TradeFormWrapper>
        <TradeFormWrapper item md={6}>
          <TradeBasketList
            status={"팔래요"}
            text={"수익"}
            color={"--custom-blue"}
            data={DUMMYDATA}
          />
          <TradeBasketList
            status={"살래요"}
            text={"지출"}
            color={"--custom-pink-4"}
            data={DUMMYDATA}
          />
        </TradeFormWrapper>
      </TradeFormContainer>
    </>
  )
}

export default TradeForm
const TradeFormContainer = styled(Grid)`
  min-height: 70vh;
  max-height: 70vh;
  gap: 32px;

  @media (max-width: 900px) {
    min-height: 100vh;
  }
`
const TradeFormWrapper = styled(Grid)`
  min-height: 70vh;
  max-height: 70vh;
  width: 100%;
`

const Header = styled.p`
  font-size: 32px;
  font-weight: bold;
`
