import styled from "styled-components"
import MyTradeHistoryCard from "./MyTradeHistoryCard"
import { PanelTitle } from "../../StockDetailPage/SubPanel/KeywordPanel/KeywordPanel"

const MyTradeHistoryList = () => {
  const DUMMY_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <>
      <PanelTitle style={{ margin: "0 0 16px 5px" }}>내 주문 기록</PanelTitle>
      <div className="scroll-x">
        <CardListContainer>
          {DUMMY_DATA.map((item) => (
            <MyTradeHistoryCard
              key={item}
              date="5월 9일 15시"
              realizedProfit={-35600}
            />
          ))}
        </CardListContainer>
      </div>
    </>
  )
}

export default MyTradeHistoryList

const CardListContainer = styled.div`
  // 레이아웃
  display: inline-flex;
`
