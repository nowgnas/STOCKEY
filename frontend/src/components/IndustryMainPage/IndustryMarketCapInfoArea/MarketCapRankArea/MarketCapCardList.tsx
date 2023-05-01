import styled from "@emotion/styled"
import MarketCapCard from "./MarketCapCard"
import { useEffect, useState } from "react"
import { TransitionGroup } from "react-transition-group"
import { StockInfoType } from "./MarketCapCard"

interface MarketCapRankListType {
  marketCapRankList: StockInfoType[]
}

const MarketCapCardList = ({ marketCapRankList }: MarketCapRankListType) => {
  const [stockCardList, setStockCardList] = useState<JSX.Element[] | null>(null)

  useEffect(() => {
    setStockCardList(
      marketCapRankList.map((stockInfo, index) => (
        <MarketCapCard
          key={stockInfo.id}
          rank={index + 1}
          stockInfo={stockInfo}
        />
      ))
    )
  }, [marketCapRankList])

  return <CardListWrapper>{stockCardList}</CardListWrapper>
}

export default MarketCapCardList

const CardListWrapper = styled(TransitionGroup)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
})
