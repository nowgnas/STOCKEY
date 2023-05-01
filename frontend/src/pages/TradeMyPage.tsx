import { SectionWrapper } from "../components/common/Background/SectionWrapper"
import Grid from "@mui/material/Grid"
const TradeMyPage = () => {
  return (
    <SectionWrapper pt={2} pb={2} pl={2} pr={2}>
      <Grid container height={"100%"}>
        <Grid item xs={9}>
          bbbbbbbbbbbbbbbbbbbbbbbbb
        </Grid>
        <Grid item xs={3}>
          <SectionWrapper
            pt={3}
            pb={3}
            pl={2}
            pr={2}
            bgColor="white"
          ></SectionWrapper>
        </Grid>
      </Grid>
    </SectionWrapper>
  )
}

export default TradeMyPage
