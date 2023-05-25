import Grid from "@mui/material/Grid"
import {
  ButtonDiv,
  LeftSection,
  LeftSlider,
  TitleDiv,
  RightSlider,
  PanelSlider,
} from "./AnimatedComponent"
import IndustrySelectorToggleBtn from "../IndustrySelectorToggleBtn"
import BookmarkBtn from "../../common/Bookmark/BookmarkBtn"
import IndustryOverall from "../IndustryOverall/IndustryOverall"
import IndustryMarketCapLineChart from "../IndustryMarketCapLineChart/IndustryMarketCapLineChart"
import IndustryBubbleChart from "../IndustryBubbleChart/IndustryBubbleChart"
import KeywordPanel from "../../StockDetailPage/SubPanel/KeywordPanel/KeywordPanel"
import { LayoutProps } from "./DefaultLayout"
import { useEffect, useState } from "react"
import AnalysisSection from "../../StockDetailPage/MainSection/KeywordSection/AnalysisSection"
import AllIncludedStockListArea from "../AllIncludedStockListArea/AllIncludedStockListArea"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  panelTypeState,
  selectedKeywordState,
} from "../../../stores/StockDetailAtoms"
import customAxios from "../../../utils/customAxios"
// import { accessTokenState } from "../../../stores/atoms"
import { useQuery } from "react-query"
import styled from "styled-components"
import Button from "@mui/material/Button"

const OnKeywordPanelLayout = ({
  changeLayout,
  className,
  industryInfo,
}: LayoutProps) => {
  // 북마크 여부 체크(로그인 상태에서만)
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const axios = customAxios({ isAuthNeeded: true })
  const fetchMyIndustryCheck = ({ queryKey }: any) => {
    const industryId = queryKey[1]
    return axios.get(`industry/stocklist/my/${industryId}`)
  }
  const select = (response: any) => {
    return response.data.data
  }

  const useMyIndustryCheck = (industryId: number) => {
    return useQuery(["myIndustryCheck", industryId], fetchMyIndustryCheck, {
      refetchOnWindowFocus: false,
      select,
      retry: false,
      enabled: !!sessionStorage.getItem("accessToken"),
    })
  }

  const { data: bookmarked } = useMyIndustryCheck(industryInfo.id)

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)

  useEffect(() => {
    setIsBookmarked(bookmarked)
  }, [bookmarked])

  const { id: keywordId, name: keyword } = useRecoilValue(selectedKeywordState)

  return (
    <>
      <Grid item xs={7}>
        <LeftSection className="kwd">
          <ButtonDiv id="btn">
            <FlexBox>
              <IndustrySelectorToggleBtn
                changeLayout={(mode) => {
                  changeLayout(mode)
                }}
                status={className}
                industryName={industryInfo.name}
              />
              <StyledButton onClick={() => changeLayout("def")}>
                키워드 패널 닫기
              </StyledButton>
            </FlexBox>
          </ButtonDiv>
          <LeftSlider className={`kwd ${className}`}>
            <TitleDiv>
              {industryInfo?.name}
              {!!sessionStorage.getItem("accessToken") && (
                <BookmarkBtn
                  isBookmarked={isBookmarked}
                  page="industry"
                  num={industryInfo.id}
                />
              )}
            </TitleDiv>
          </LeftSlider>
          <LeftSlider className={`kwd ${className}`}>
            <IndustryOverall industryInfo={industryInfo} />
          </LeftSlider>
          <LeftSlider className={`kwd ${className}`}>
            <IndustryMarketCapLineChart industryId={industryInfo?.id} />
          </LeftSlider>
          <LeftSlider className={`kwd ${className}`}>
            <AnalysisSection />
          </LeftSlider>
          <RightSlider className={`kwd ${className}`}>
            <IndustryBubbleChart industryId={industryInfo?.id} />
          </RightSlider>
          <RightSlider className={`kwd ${className}`}>
            <AllIncludedStockListArea
              industryId={industryInfo.id}
              industryName={industryInfo.name}
            />
          </RightSlider>
        </LeftSection>
      </Grid>
      <Grid item xs={5}>
        <PanelSlider className={`kwd ${className}`}>
          <KeywordPanel keywordId={keywordId} keyword={keyword} />
        </PanelSlider>
      </Grid>
    </>
  )
}

export default OnKeywordPanelLayout

const StyledButton = styled.button`
  width: 180px;
  height: 4.8rem;
  background: var(--custom-gradient-pink);
  border-radius: 24px;
  border: none;
  padding-left: 6;
  font-family: "Inter";
  font-style: "normal";
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0.1px;
  color: #ffffff;
  right: 0;
`

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`
