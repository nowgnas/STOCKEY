import styled from "styled-components"
import StockCard from "./StockCard"

interface StockListProps {
  stockList: {
    id: number
    name: string
    price: number
    rate: number
  }[]
}

const StockList = ({ stockList }: StockListProps) => {
  return (
    <CardListDiv>
      {stockList.map((stockInfo) => {
        return (
          <LocationDiv>
            <StockCard key={stockInfo.id} stockInfo={stockInfo} />
          </LocationDiv>
        )
      })}
    </CardListDiv>
  )
}

export default StockList

const LocationDiv = styled.div`
  width: calc((100% - 48px) / 2);
`

const CardListDiv = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  gap: 24px;
  width: auto;
  padding: 4px;
  overflow-y: scroll;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`
