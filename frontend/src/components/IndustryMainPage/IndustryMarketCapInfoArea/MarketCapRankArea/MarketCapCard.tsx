import Grow from "@mui/material/Grow"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export interface StockInfoType {
  id: number
  name: string
  marketCap: number
}

interface CardProps {
  rank: number
  stockInfo: StockInfoType
}

const MarketCapCard = ({ rank, stockInfo }: CardProps) => {
  const navigate = useNavigate()

  const makePriceFormat = (num: number) => {
    let roundedNum = Math.round(num / 100000000)
    let result = ""
    let unitWord = "억"
    while (roundedNum > 0) {
      let chunk = roundedNum % 10000
      result =
        chunk.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        unitWord +
        result
      roundedNum = Math.floor(roundedNum / 10000)
      unitWord = "조 "
    }
    return result
  }

  const formattedMarketCap = makePriceFormat(stockInfo.marketCap)

  const handleCardClick = () => {
    navigate(`/stock/${stockInfo.id}`)
  }

  return (
    <CardWrapper>
      <Grow in={true} timeout={rank * 300} onClick={handleCardClick}>
        <CardDiv>
          <RankDiv>{rank}</RankDiv>
          <StockNameDiv>{stockInfo.name}</StockNameDiv>
          <MarketCapDiv>{formattedMarketCap}</MarketCapDiv>
        </CardDiv>
      </Grow>
    </CardWrapper>
  )
}

export default MarketCapCard

const CardWrapper = styled.div`
  height: calc((100% - 4.8rem) / 5);

  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 24px;

  transition: all 0.25s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.05, 1.05);
  }
`

const CardDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 12px 24px;
  gap: 12px;

  text-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.1px;

  border-radius: 24px;
`

const RankDiv = styled.div`
  width: 2.4rem;
  height: auto;
  font-size: calc(1rem + 0.2vw);
  text-align: center;
`

const StockNameDiv = styled.div`
  flex-grow: 1;
  font-size: calc(1rem + 0.2vw);
`

const MarketCapDiv = styled.div`
  flex-grow: 1;
  font-size: calc(1rem + 0.2vw);
  text-align: right;
`
