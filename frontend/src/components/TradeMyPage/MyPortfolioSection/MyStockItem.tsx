import { Grid } from "@mui/material"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { MyStockType } from "../../../hooks/useMyStockList"

const MyStockItem = ({ myStock }: { myStock: MyStockType }) => {
  const { stockId, stockName, svp, rrp, curStockPrice, avgPrice, count } =
    myStock
  const navigate = useNavigate()
  const handleStockClick = () => {
    navigate(`/stock/${stockId}`)
  }

  return (
    <StockItemWrapper container onClick={handleStockClick}>
      <Grid
        item
        xs={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <LogoImg src={`/logo_images/${stockName}.png`} />
      </Grid>
      <StockInfoWrapper container xs={10} rowGap={0}>
        <Grid item xs={12} display="flex" justifyContent="space-between">
          <CompanyName>{stockName}</CompanyName>
          <CurrentPrice>{curStockPrice.toLocaleString()}</CurrentPrice>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="space-between">
          <Quantity>{count}주</Quantity>
          <ReturnRate className={rrp > 0 ? "positive" : "negative"}>
            {rrp > 0 ? "+ " : null}
            {rrp}%
          </ReturnRate>
        </Grid>
      </StockInfoWrapper>
    </StockItemWrapper>
  )
}

export default MyStockItem

const StockItemWrapper = styled(Grid)`
  padding: 2%;
  cursor: pointer;

  & p {
    font-weight: bold;
    margin: 0.5rem;
  }
`

const LogoImg = styled.img`
  border-radius: 16px;
  width: 80%;
  height: auto;
`

const StockInfoWrapper = styled(Grid)`
  display: flex;
  flex-direction: column;
`

const CompanyName = styled.p`
  font-size: 1.4rem;
`

const Quantity = styled.p`
  color: var(--custom-gray-1);
  font-weight: normal;
`

const CurrentPrice = styled.p`
  font-size: 1.3rem;
`

const ReturnRate = styled.p`
  color: var(--custom-gray-1); // 기본 색상은 회색
  font-size: 1.2rem;

  // 수익률에 따라 색상 변경
  &.positive {
    color: var(--custom-increase-red);
  }
  &.negative {
    color: var(--custom-decrease-blue);
  }
`
