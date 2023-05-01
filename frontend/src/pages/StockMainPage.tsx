import BriefingSection from "../components/StockMainPage/BriefingSection/BriefingSection"
import RecommendSection from "../components/StockMainPage/RecommendSection/RecommendSection"
import Grid from "@mui/material/Grid"
import PageTitle from "../components/common/PageTitle/PageTitle"
import Searchbar from "../components/common/Searchbar/Searchbar"

const StockMainPage = () => {
  return (
    <Grid container rowSpacing={3} padding={"36px"}>
      <Grid item xs={12} sx={{ zIndex: 4 }}>
        <Searchbar page="stock" />
      </Grid>
      <Grid item xs={12} mt={2}>
        <PageTitle
          pageTitleInfo={{
            pageTitle: "주식 종목",
            pageDescription: "주식 종목에 대한 정보를 볼 수 있는 공간입니다.",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <BriefingSection />
      </Grid>
      {/* <Grid item xs={12}>
        <RecommendSection />
      </Grid> */}
    </Grid>
  )
}

export default StockMainPage
