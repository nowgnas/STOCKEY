import { Grid } from "@mui/material"
import HighlyRelatedStockSwitch from "./HighlyRelatedStockSwitch"
import styled from "styled-components"
import { useRecoilValue } from "recoil"
import { stockDetailState } from "../../../../stores/StockDetailAtoms"
import { selectedKeywordState } from "../../../../stores/StockDetailAtoms"
import { keywordAnalysisParamsState } from "../../../../stores/StockDetailAtoms"
import { useHighlyCorrStocks } from "../../../../hooks/useHighlyCorrelatedStocks"
import { KeywordPanelProps } from "./KeywordPanel"
import { HighlightedSpan } from "../../MainSection/PriceSection/PriceSection"

const HighlyRelatedStockList = ({ keywordId, keyword }: KeywordPanelProps) => {
  const stockDetail = useRecoilValue(stockDetailState)
  const selectedKeyword = useRecoilValue(selectedKeywordState)
  const keywordAnalysisParams = useRecoilValue(keywordAnalysisParamsState)
  const { data: highlyCorrStocks } = useHighlyCorrStocks(
    stockDetail?.id,
    keywordId,
    keywordAnalysisParams.startDate,
    keywordAnalysisParams.endDate
  )
  const colors: string[] = ["pink", "orange", "yellow", "green"]
  return (
    <StockListSection>
      <Title>
        같은 산업군 중에{" "}
        <HighlightedSpan color={"var(--custom-blue)"}>
          {selectedKeyword.name}
        </HighlightedSpan>
        과 상관관계가 높은 종목들이에요
      </Title>
      <BtnsContainer container spacing={1}>
        {highlyCorrStocks?.map((stock, index) => (
          <Grid item>
            <HighlyRelatedStockSwitch
              stockName={stock.name}
              color={colors[index]}
            />
          </Grid>
        ))}
      </BtnsContainer>
    </StockListSection>
  )
}

export default HighlyRelatedStockList

const StockListSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
  white-space: nowrap;
  line-height: 50px;
`
const BtnsContainer = styled(Grid)`
  // display: flex;
  // flex-direction: column;
  // justify-content: space-evenly;
  // align-items: stretch;
`
