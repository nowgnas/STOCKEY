import styled from "@emotion/styled"
import IndustryMarketCapChartArea from "./IndustryMarketCapChartArea/IndustryMarketCapChartArea"
import MarketCapRankArea from "./MarketCapRankArea/MarketCapRankArea"
import { useState } from "react"
import { useIndustryMarketCapList } from "../../../hooks/useIndustryMarketCapList"
import Spinner from "../../common/Spinner/Spinner"
import Grid from "@mui/material/Grid/Grid"

export type ClickedIndustryInfoType = {
  id: string | undefined
  name: string
  color: string
}

const IndustryMarketCapInfoArea = () => {
  const { data: chartData } = useIndustryMarketCapList()

  const [clickedIndustryInfo, setClickedIndustryInfo] =
    useState<ClickedIndustryInfoType>({
      id: undefined,
      name: "전체",
      color: "var(--custom-black)",
    })

  const handleClickedIndustryInfo = (
    clickedIndustryInfo: ClickedIndustryInfoType
  ) => {
    setClickedIndustryInfo(clickedIndustryInfo)
  }

  return (
    <AreaDiv>
      <TitleDiv>산업별 규모를 확인해보세요📈</TitleDiv>
      <ContentGrid container spacing={2}>
        <ItemGrid item xs={6}>
          {chartData ? (
            <IndustryMarketCapChartArea
              chartData={chartData}
              handleClickedIndustryInfo={handleClickedIndustryInfo}
            />
          ) : (
            <Spinner />
          )}
        </ItemGrid>
        <ItemGrid item xs={6}>
          <MarketCapRankArea clickedIndustryInfo={clickedIndustryInfo} />
        </ItemGrid>
      </ContentGrid>
    </AreaDiv>
  )
}

export default IndustryMarketCapInfoArea

const AreaDiv = styled.div`
  min-width: 500px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 24px;
  background: #f8f8f8;
  border-radius: 24px;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15);
  filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.3));
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
`

const ContentGrid = styled(Grid)({
  height: "calc(100% - 4rem)",
  // flexGrow: 1,
})

const ItemGrid = styled(Grid)({
  height: "100%",
})
