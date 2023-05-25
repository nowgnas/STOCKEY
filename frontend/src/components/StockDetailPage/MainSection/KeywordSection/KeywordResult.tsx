import { Tab, Tabs, Grid } from "@mui/material"
import { PanelSubTitle } from "../../SubPanel/KeywordPanel/KeywordPanel"
import { HighlightedSpan } from "../PriceSection/PriceSection"
import { useState } from "react"
import NewsTabPanel from "./NewsTabPanel"
import styled, { keyframes } from "styled-components"
import { triggerScroll } from "../../../common/Functions/triggerScroll"
import { useRecoilValue, useRecoilState } from "recoil"
import {
  keywordAnalysisParamsState,
  stockDetailState,
} from "../../../../stores/StockDetailAtoms"
import { useKeywordRank } from "../../../../hooks/useKeywordRank"
import dayjs from "dayjs"

const KeywordResult = () => {
  const [keywordAnalysisParams, setKeywordAnalysisParams] = useRecoilState(
    keywordAnalysisParamsState
  )
  const { data, isLoading } = useKeywordRank(keywordAnalysisParams)
  const [activeTab, setActiveTab] = useState<number>(0)
  const stockDetail = useRecoilValue(stockDetailState)
  const newsTypes: ("STOCK" | "INDUSTRY" | "ECONOMY")[] = [
    "STOCK",
    "INDUSTRY",
    "ECONOMY",
  ]
  const { data: keywordRankData } = useKeywordRank(keywordAnalysisParams)
  const { top3, others, totalNewsCount } = { ...keywordRankData }
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    stockDetail &&
      setKeywordAnalysisParams({
        ...keywordAnalysisParams,
        newsType: newsTypes[newValue],
        typeId:
          newValue === 0
            ? stockDetail?.id
            : newValue === 1
            ? stockDetail?.industry.id
            : -1,
      })
    setActiveTab(newValue)
  }

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    }
  }

  return (
    <Grid container>
      <Grid item xs={12} px={3}>
        {isLoading ? (
          <PanelSubTitle>
            <HighlightedSpan color="var(--custom-pink-1)">
              {
                [stockDetail?.name, stockDetail?.industry.name, "경제"][
                  activeTab
                ]
              }
            </HighlightedSpan>{" "}
            관련 뉴스에서 핵심 키워드를 뽑고 있어요...
            <SpinningSpan>⏳</SpinningSpan>
          </PanelSubTitle>
        ) : (
          <PanelSubTitle>
            <HighlightedSpan color="var(--custom-pink-1)">
              {
                [stockDetail?.name, stockDetail?.industry.name, "경제"][
                  activeTab
                ]
              }
            </HighlightedSpan>{" "}
            관련 뉴스에서 많이 언급된 키워드를 살펴보세요!
          </PanelSubTitle>
        )}
      </Grid>
      <MetaData
        item
        px={3}
        mb={4}
        onClick={() => triggerScroll("priceChartRef")}
      >
        ⏰{" "}
        {dayjs("20" + keywordAnalysisParams.startDate, "YYYYMMDD").format(
          "YYYY년 M월 D일"
        )}{" "}
        ~{" "}
        {dayjs("20" + keywordAnalysisParams.endDate, "YYYYMMDD").format(
          "YYYY년 M월 D일"
        )}{" "}
        {totalNewsCount?.toLocaleString()}건의 뉴스를 분석한 결과예요.
      </MetaData>

      <Grid item xs={12}>
        <NewsCategoryTabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="inherit"
          variant="fullWidth"
        >
          <NewsTab label={stockDetail?.name} {...a11yProps(0)} />
          <NewsTab label={stockDetail?.industry.name} {...a11yProps(1)} />
          <NewsTab label={"경제"} {...a11yProps(2)} />
        </NewsCategoryTabs>
        <NewsTabPanel isLoading={isLoading} activeTab={activeTab} index={0} />
        <NewsTabPanel isLoading={isLoading} activeTab={activeTab} index={1} />
        <NewsTabPanel isLoading={isLoading} activeTab={activeTab} index={2} />
      </Grid>
    </Grid>
  )
}

export default KeywordResult

const Spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
`
const SpinningSpan = styled.div`
  display: inline-block;
  animation: ${Spin} 2s linear infinite;
`

const MetaData = styled(Grid)`
  color: gray;
  font-weight: bold;
  font-size: 1.6rem;
  font-style: italic;
  cursor: pointer;
`

const NewsCategoryTabs = styled(Tabs)`
  & .MuiTabs-indicator {
    // indicator 길이를 짧게 만들기 위해 padding-inline을 줌
    // padding 부분을 제외한 content 부분만 background-color를 적용
    padding-inline: 10%;
    background-clip: content-box;
    background-color: #db9eb5;
  }
`

const NewsTab = styled(Tab)`
  color: var(--custom-black) !important;
  font-size: 1.5rem !important;
  font-weight: bold !important;
  &.Mui-selected {
    color: #db9eb5 !important;
  }
`
