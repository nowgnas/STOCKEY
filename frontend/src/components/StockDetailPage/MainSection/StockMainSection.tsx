import styled from "styled-components"
import { PanelTitle } from "../SubPanel/KeywordPanel/KeywordPanel"
import BookmarkBtn from "../../common/Bookmark/BookmarkBtn"
import PriceSection from "./PriceSection/PriceSection"
import AnalysisSection from "./KeywordSection/AnalysisSection"
import { Grid } from "@mui/material"
import { useRecoilValue } from "recoil"
import { stockDetailState } from "../../../stores/StockDetailAtoms"
import { useParams } from "react-router-dom"
import { useStockBookmark } from "../../../hooks/useStockBookmark"

const StockMainSection = () => {
  const params = useParams()
  const stockId = Number(params?.stockId)
  const stockDetail = useRecoilValue(stockDetailState)
  const { data: isBookmarked } = useStockBookmark(stockId)

  return (
    <SectionWrapper container rowSpacing={3}>
      <Grid item xs={12}>
        <PanelTitle>
          {stockDetail?.name}
          {isBookmarked === undefined ? null : (
            <BookmarkBtn
              isBookmarked={isBookmarked}
              page="stock"
              num={stockId}
            />
          )}
        </PanelTitle>
      </Grid>
      <Grid item xs={12} id="priceChartRef">
        <PriceSection />
      </Grid>
      <Grid item xs={12}>
        <AnalysisSection />
      </Grid>
    </SectionWrapper>
  )
}

export default StockMainSection

const SectionWrapper = styled(Grid)`
  padding: 12px 24px 24px;
  overflow-y: scroll;
  height: 100%;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`
