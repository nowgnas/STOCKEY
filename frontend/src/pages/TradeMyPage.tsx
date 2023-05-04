import { SectionWrapper } from "../components/common/Background/SectionWrapper"
import Grid from "@mui/material/Grid"
import MyPortfolioSection from "../components/TradeMyPage/MyPortfolioSection/MyPortfolioSection"
import OtherInfoSection from "../components/TradeMyPage/OtherInfoSection/OtherInfoSection"
const TradeMyPage = () => {
  return (
    <SectionWrapper pt={2} pb={2} pl={2} pr={2}>
      <Grid container height={"100%"}>
        <Grid item xs={8} height={"100%"}>
          <OtherInfoSection />
        </Grid>
        <Grid item xs={4} height={"100%"}>
          <MyPortfolioSection />
        </Grid>
      </Grid>
    </SectionWrapper>
  )
}

export default TradeMyPage
