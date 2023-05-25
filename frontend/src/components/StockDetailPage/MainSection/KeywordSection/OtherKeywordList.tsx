import KeywordListItem from "./KeywordListItem"
import styled from "styled-components"
import { Grid } from "@mui/material"
import { ChartDataType, useKeywordRank } from "../../../../hooks/useKeywordRank"
import { useRecoilValue } from "recoil"
import { keywordAnalysisParamsState } from "../../../../stores/StockDetailAtoms"

const OtherKeywordList = () => {
  const keywordAnalysisParams = useRecoilValue(keywordAnalysisParamsState)
  const { data: keywordRankData } = useKeywordRank(keywordAnalysisParams)
  const { top3, others, totalNewsCount } = { ...keywordRankData }

  return (
    <KeywordListWrapper container rowSpacing={6}>
      {others?.map((keyword: ChartDataType, index: number) => {
        return (
          <Grid item xs={12} key={`keyword-${index + 4}th`}>
            <KeywordListItem
              rank={keyword.rank}
              keyword={keyword.name}
              percentage={keyword.y}
              keywordId={keyword.keywordId}
            />
          </Grid>
        )
      })}
    </KeywordListWrapper>
  )
}

export default OtherKeywordList

const KeywordListWrapper = styled(Grid)`
  padding: 0px 36px 50px;
  border-radius: 0 0 24px 24px;
  background-color: black;
  background-color: #fffefb;
  width: 100% !important;
  margin: -14px 0 0 0 !important;
  position: relative;
  z-index: 1;
`
