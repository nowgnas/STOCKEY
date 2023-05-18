import styled from "styled-components"
import NewsSection from "./NewsSection"
import KeywordChartSection from "./KeywordChartSection"
import KeywordSearchBtn from "./KeywordSearchBtn"
import BookmarkBtn from "../../../common/Bookmark/BookmarkBtn"
import { useRecoilState } from "recoil"
// useQuery
import { useQuery } from "react-query"
import customAxios from "../../../../utils/customAxios"
// import { accessTokenState } from "../../../../stores/atoms"
import { HighlightedSpan } from "../../MainSection/PriceSection/PriceSection"
import { Suspense } from "react"
import LoadingComponent from "../../../common/Loading/LoadingComponent"

export interface KeywordPanelProps {
  keywordId: number
  keyword: string
}
const KeywordPanel = ({ keywordId, keyword }: KeywordPanelProps) => {
  // accesstoken state
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  // customAxios
  const axios = customAxios({ isAuthNeeded: true })
  // useQuery: get whether the keyword is bookmarked
  const fetchIsKeywordBookmarked = () => {
    return axios.get(`/keywords/keywordlist/my/${keywordId}`)
  }
  const select = (response: any) => {
    const isBookmarked: boolean = response.data.data
    return isBookmarked
  }
  const { data: isBookmarked } = useQuery(
    "isKeywordBookmarked",
    fetchIsKeywordBookmarked,
    {
      enabled: !!sessionStorage.getItem("accessToken"),
      select,
      refetchOnWindowFocus: true,
    }
  )
  return (
    <PanelWrapper>
      <TopRow>
        <PanelTitle>
          {keyword}
          {isBookmarked !== undefined && (
            <BookmarkBtn
              isBookmarked={isBookmarked}
              page="keyword"
              num={keywordId}
            />
          )}
        </PanelTitle>
        <KeywordSearchBtn keyword={keyword} />
      </TopRow>

      <PanelSubTitle>
        <HighlightedSpan color="var(--custom-blue)" size="2.4rem">
          {keyword}
        </HighlightedSpan>{" "}
        관련 기사가 얼마나 있었을까요?
      </PanelSubTitle>
      <KeywordChartSection keywordId={keywordId} keyword={keyword} />
      <PanelSubTitle id="newsRef">
        {keyword} 관련 기사 한 눈에 보기
      </PanelSubTitle>
      <Suspense fallback={<LoadingComponent />}>
        <NewsSection keywordId={keywordId} keyword={keyword} />
      </Suspense>
    </PanelWrapper>
  )
}

export default KeywordPanel

export const PanelWrapper = styled.div`
  background-color: #faf5f7;
  border-radius: 30px 0 0 0;
  display: flex;
  padding: 12px 24px 24px;
  flex-direction: column;
  align-items: left;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 1;
  position: relative;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`
export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  margin-bottom: 5%;
`

export const PanelTitle = styled.p`
  font-size: 2.6rem;
  font-weight: bold;
  letter-spacing: 0.2rem;
  margin-bottom: 0;
`
export const PanelSubTitle = styled.p`
  font-size: 2.2rem;
  font-weight: bold;
`
