import TradeShortcutCard from "../../TradeMainPage/TradeShortcutCard"

const MyTradeRankingCard = () => {
  return (
    <TradeShortcutCard
      title="현재까지"
      content="13등"
      navPage="/trade/ranking"
      imageSrc="trophy"
      bgColor="--custom-yellow-4"
    />
  )
}

export default MyTradeRankingCard
