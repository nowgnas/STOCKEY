import styled from "styled-components"
import KeywordChartSection from "../StockDetailPage/SubPanel/KeywordPanel/KeywordChartSection"
import { HighlightedSpan } from "../StockDetailPage/MainSection/PriceSection/PriceSection"
import KeywordChart from "../StockDetailPage/SubPanel/KeywordPanel/KeywordChart"
import HighlyRelatedStockList from "../StockDetailPage/SubPanel/KeywordPanel/HighlyRelatedStockList"

interface Props {
  keywordId: number
  keyword: string
}

const KeywordChartArea = ({ keywordId, keyword }: Props) => {
  return (
    <AreaDiv>
      <TitleDiv>
        <HighlightedSpan color="var(--custom-purple-1)">
          {keyword}
        </HighlightedSpan>
        {" 키워드의 등장 추이"}
      </TitleDiv>
      <ChartWrapper id="keyword-chart">
        <KeywordChart keywordId={keywordId} keyword={keyword} />
      </ChartWrapper>
      <ListWrapper>
        <HighlyRelatedStockList keywordId={keywordId} keyword={keyword} />
      </ListWrapper>
    </AreaDiv>
  )
}

export default KeywordChartArea

const AreaDiv = styled.div`
  width: 60%;
  height: 100%;
  padding: 24px 24px 36px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const TitleDiv = styled.div`
  height: 2rem;
  width: auto;
  padding: 0px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2rem;
  /* or 83% */

  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  white-space: pre;
`

const ListWrapper = styled.div`
  height: 100px;
`

const ChartWrapper = styled.div`
  background-color: var(--custom-background);
  border-radius: 24px;
  padding: 2rem;
`
