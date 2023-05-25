import CapitalAnalysisCard from "./CapitalAnalysisCard"
import PriceAnalysisCard from "./PriceAnalysisCard"
import LikeAnalysisCard from "./LikeAnalysisCard"
import { Grid } from "@mui/material"
import { useRecoilValue } from "recoil"
import { stockDetailState } from "../../../../../stores/StockDetailAtoms"

const ComparingAnalysisList = () => {
  const stockDetail = useRecoilValue(stockDetailState)

  return (
    <Grid container spacing={1}>
      {stockDetail && (
        <>
          <Grid item>
            <CapitalAnalysisCard
              industry={stockDetail.industry.name}
              industryTotal={stockDetail.industryTotalCount}
              // industryTotal={100}
              industryRank={stockDetail.industryCapRank}
            />
          </Grid>
          <Grid item>
            <PriceAnalysisCard
              stockName={stockDetail.name}
              industry={stockDetail.industry.name}
              industryAvgChangeRate={stockDetail.industryAvgChangeRate}
              changeRate={stockDetail.todayDailyStock.changeRate}
            />
          </Grid>
          <Grid item>
            <LikeAnalysisCard
              likeRank={stockDetail.industryFavRank}
              industry={stockDetail.industry.name}
              // industryTotal={100}
              industryTotal={stockDetail.industryTotalCount}
            />
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default ComparingAnalysisList
