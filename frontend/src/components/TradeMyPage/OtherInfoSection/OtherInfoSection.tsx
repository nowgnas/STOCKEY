import { SectionWrapper } from "../../common/Background/SectionWrapper"
import MyAccountFlowChart from "./MyAccountFlowChart"
import MyTradeHistoryList from "./MyTradeHistoryList"
import MyTradeRankingCard from "./MyTradeRankingCard"
import MyTradingTypeCard from "./MyTradingTypeCard"

const OtherInfoSection = () => {
  return (
    <SectionWrapper pr={2}>
      <MyAccountFlowChart />
      <MyTradeRankingCard />
      <MyTradingTypeCard />
      <MyTradeHistoryList />
    </SectionWrapper>
  )
}

export default OtherInfoSection
