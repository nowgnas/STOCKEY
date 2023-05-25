import { PanelSubTitle } from "../../KeywordPanel/KeywordPanel"
import { Grid } from "@mui/material"
import ComparingAnalysisList from "./ComparingAnalysisList"
import { useRecoilValue } from "recoil"
import { stockDetailState } from "../../../../../stores/StockDetailAtoms"
import { HighlightedSpan } from "../../../MainSection/PriceSection/PriceSection"

const ComparingAnalysisSection = () => {
  const stockDetail = useRecoilValue(stockDetailState)

  return (
    <>
      <PanelSubTitle>
        다른{" "}
        <HighlightedSpan color="var(--custom-green-1)">
          {stockDetail?.industry.name}
        </HighlightedSpan>{" "}
        종목들과 비교하면 어떨까요?
      </PanelSubTitle>
      <Grid container>
        <Grid item xs={12}>
          <ComparingAnalysisList />
        </Grid>
      </Grid>
    </>
  )
}

export default ComparingAnalysisSection
