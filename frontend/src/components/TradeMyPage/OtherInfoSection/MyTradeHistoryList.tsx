import styled from "styled-components"
import MyTradeHistoryCard from "./MyTradeHistoryCard"
import MyCurrentTradeHistoryCard from "./MyCurrentTradeHistoryCard"
import { PanelTitle } from "../../StockDetailPage/SubPanel/KeywordPanel/KeywordPanel"

const MyTradeHistoryList = () => {
  const DUMMY_DATA = [35000, -1600, 0, -105800, 4100, 700]
  return (
    <>
      <PanelTitle style={{ margin: "0 0 2px 5px" }}>내 주문 기록</PanelTitle>
      <div className="scroll-x" style={{ overflowY: "visible" }}>
        <CardListContainer>
          <MyCurrentTradeHistoryCard isSubmitted={true} />
          <MyCurrentTradeHistoryCard isSubmitted={false} />
          {DUMMY_DATA.map((item) => (
            <MyTradeHistoryCard
              key={item}
              date="5월 9일 15시"
              realizedProfit={item}
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
  padding: 3%;
`
