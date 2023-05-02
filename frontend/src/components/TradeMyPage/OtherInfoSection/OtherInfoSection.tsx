import { Grid } from "@mui/material"
import { SectionWrapper } from "../../common/Background/SectionWrapper"
import MyAccountFlowChart from "./MyAccountFlowChart"
import MyTradeHistoryList from "./MyTradeHistoryList"
import MyTradeRankingCard from "./MyTradeRankingCard"
import MyTradingTypeCard from "./MyTradingTypeCard"

const OtherInfoSection = () => {
  return (
    <SectionWrapper pr={2}>
      <MyAccountFlowChart />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <MyTradeRankingCard />
        </Grid>
        <Grid item xs={8}>
          <MyTradingTypeCard />
        </Grid>
      </Grid>
      <MyTradeHistoryList />
    </SectionWrapper>
  )
}

export default OtherInfoSection
