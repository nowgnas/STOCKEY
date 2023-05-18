import Grid from "@mui/material/Grid"
import {
  ButtonDiv,
  LeftSection,
  LeftSlider,
  TitleDiv,
  RightSlider,
  SelectorSlider,
  RightSection,
} from "./AnimatedComponent"
import IndustrySelectorToggleBtn from "../IndustrySelectorToggleBtn"
import BookmarkBtn from "../../common/Bookmark/BookmarkBtn"
import IndustryOverall from "../IndustryOverall/IndustryOverall"
import IndustryMarketCapLineChart from "../IndustryMarketCapLineChart/IndustryMarketCapLineChart"
import IndustryBubbleChart from "../IndustryBubbleChart/IndustryBubbleChart"
import { LayoutProps } from "./DefaultLayout"
import IndustrySelector from "../../IndustryMainPage/IndustrySelector/IndustrySelector"
import { useEffect, useState } from "react"
import AnalysisSection from "../../StockDetailPage/MainSection/KeywordSection/AnalysisSection"
import AllIncludedStockListArea from "../AllIncludedStockListArea/AllIncludedStockListArea"
import { useRecoilState } from "recoil"
// import { accessTokenState } from "../../../stores/atoms"
import customAxios from "../../../utils/customAxios"
import { useQuery } from "react-query"

const OnIndustrySelectorLayout = ({
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

  return (
    <>
      <Grid item xs={12} marginLeft={4.5}>
        <ButtonDiv id="btn">
          <IndustrySelectorToggleBtn
            changeLayout={(mode) => {
              changeLayout(mode)
            }}
            status={className}
            industryName={industryInfo.name}
          />
        </ButtonDiv>
      </Grid>
      <Grid item xs={5}>
        <LeftSection className="sel">
          <SelectorSlider className={`sel ${className}`}>
            <IndustrySelector />
          </SelectorSlider>
        </LeftSection>
      </Grid>
      <Grid item xs={7}>
        <RightSection id="right" className="sel">
          <LeftSlider className={`sel ${className}`}>
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
          <LeftSlider className={`sel ${className}`}>
            <IndustryOverall industryInfo={industryInfo} />
          </LeftSlider>
          <LeftSlider className={`sel ${className}`}>
            <IndustryMarketCapLineChart industryId={industryInfo.id} />
          </LeftSlider>
          <LeftSlider className={`sel ${className}`}>
            <AnalysisSection />
          </LeftSlider>
          <RightSlider className={`sel ${className}`}>
            <IndustryBubbleChart industryId={industryInfo?.id} />
          </RightSlider>
          <RightSlider className={`sel ${className}`}>
            <AllIncludedStockListArea
              industryId={industryInfo.id}
              industryName={industryInfo.name}
            />
          </RightSlider>
        </RightSection>
      </Grid>
    </>
  )
}

export default OnIndustrySelectorLayout
