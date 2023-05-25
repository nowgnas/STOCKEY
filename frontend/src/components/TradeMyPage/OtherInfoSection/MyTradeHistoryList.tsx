import styled from "styled-components"
import MyTradeHistoryCard from "./MyTradeHistoryCard"
import MyCurrentTradeHistoryCard from "./MyCurrentTradeHistoryCard"
import { PanelTitle } from "../../StockDetailPage/SubPanel/KeywordPanel/KeywordPanel"
import { useMyTradeHistory } from "../../../hooks/useMyTradeHistory"

const MyTradeHistoryList = () => {
  // const MyTrades: any = {
  //   "5월 18일 10시": {
  //     BUY: [
  //       {
  //         id: 1,
  //         name: "Apple",
  //         orderQuantity: 5,
  //         contractQuantity: 3,
  //         contractPrice: 1500,
  //         profit: 100,
  //       },
  //     ],
  //     SELL: [],
  //   },
  //   "5월 18일 14시": {
  //     BUY: [
  //       {
  //         id: 2,
  //         name: "Google",
  //         orderQuantity: 2,
  //         contractQuantity: 2,
  //         contractPrice: 2500,
  //         profit: 50,
  //       },
  //     ],
  //     SELL: [],
  //   },
  //   "5월 19일 9시": {
  //     BUY: [],
  //     SELL: [
  //       {
  //         id: 3,
  //         name: "Microsoft",
  //         orderQuantity: 4,
  //         contractQuantity: 4,
  //         contractPrice: 1800,
  //         profit: -80,
  //       },
  //     ],
  //   },
  //   "5월 19일 14시": {
  //     BUY: [],
  //     SELL: [
  //       {
  //         id: 1,
  //         name: "Apple",
  //         orderQuantity: 3,
  //         contractQuantity: 2,
  //         contractPrice: 1600,
  //         profit: 120,
  //       },
  //     ],
  //   },
  // }

  const { data: myTrades } = useMyTradeHistory()

  return (
    <>
      <PanelTitle style={{ margin: "0 0 2px 5px" }}>내 주문 기록</PanelTitle>
      <div className="scroll-x" style={{ overflowY: "visible" }}>
        <CardListContainer>
          <MyCurrentTradeHistoryCard isSubmitted={true} />
          {/* <MyCurrentTradeHistoryCard isSubmitted={false} /> */}
          {myTrades &&
            Object.keys(myTrades).map((tradeTime) => (
              <MyTradeHistoryCard
                key={`trade-${tradeTime}`}
                buyList={myTrades[tradeTime]["BUY"]}
                sellList={myTrades[tradeTime]["SELL"]}
                date={tradeTime}
                // realizedProfit={item}
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
