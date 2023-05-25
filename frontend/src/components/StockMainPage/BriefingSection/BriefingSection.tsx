import KeywordBoard from "./KeywordBoard"
import RandomStockList from "./RandomStockList"
import Grid from "@mui/material/Grid"

const BriefingSection = () => {
  return (
    <Grid container>
      <Grid item xs={8}>
        <KeywordBoard />
      </Grid>
      <Grid item xs={3} pl={4} pr={5}>
        <RandomStockList />
      </Grid>
    </Grid>
  )
}

export default BriefingSection
