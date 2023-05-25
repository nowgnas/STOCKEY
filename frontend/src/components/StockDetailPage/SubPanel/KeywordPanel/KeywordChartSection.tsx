import HighlyRelatedStockList from "./HighlyRelatedStockList"
import KeywordChart from "./KeywordChart"
import { Suspense } from "react"
import { KeywordPanelProps } from "./KeywordPanel"
import CorrelationResult from "./CorrelationResult"

const KeywordChartSection = ({ keywordId, keyword }: KeywordPanelProps) => {
  return (
    <>
      <Suspense fallback={<></>}>
        <KeywordChart keywordId={keywordId} keyword={keyword} />
      </Suspense>

      <CorrelationResult keywordId={keywordId} keyword={keyword} />
      <HighlyRelatedStockList keywordId={keywordId} keyword={keyword} />
    </>
  )
}

export default KeywordChartSection
