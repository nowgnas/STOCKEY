import styled from "styled-components"
import { TitleDiv } from "../IndustryDetailPage/PageLayouts/AnimatedComponent"
import BookmarkBtn from "../common/Bookmark/BookmarkBtn"
import { useRecoilState, useSetRecoilState } from "recoil"
import { KeywordType } from "../../stores/KeywordPageAtoms"
// import { accessTokenState } from "../../stores/atoms"
import customAxios from "../../utils/customAxios"
import { useQuery } from "react-query"
import { Suspense, useEffect, useState } from "react"
import KeywordChartArea from "./KeywordChartArea"
import NewsArea from "./NewsArea"
import LoadingComponent from "../common/Loading/LoadingComponent"
import {
  keywordAnalysisParamsState,
  selectedKeywordState,
} from "../../stores/StockDetailAtoms"
import dayjs from "dayjs"

const KeywordDetailContent = ({
  keywordInfo,
}: {
  keywordInfo: KeywordType
}) => {
  // 북마크 여부 체크(로그인 상태에서만)
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const axios = customAxios({ isAuthNeeded: true })
  const fetchMyKeywordCheck = ({ queryKey }: any) => {
    const keywordId = queryKey[1]
    return axios.get(`/keywords/keywordlist/my/${keywordId}`)
  }
  const select = (response: any) => {
    return response.data.data
  }

  const useMyKeywordCheck = (keywordId: number) => {
    return useQuery(["myKeywordCheck", keywordId], fetchMyKeywordCheck, {
      refetchOnWindowFocus: false,
      select,
      retry: false,
      enabled: !!sessionStorage.getItem("accessToken"),
    })
  }

  const { data: bookmarked } = useMyKeywordCheck(keywordInfo.id)

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)

  useEffect(() => {
    setIsBookmarked(bookmarked)
  }, [bookmarked])

  const setKeywordAnalysisParamsState = useSetRecoilState(
    keywordAnalysisParamsState
  )
  const setSelectedKeywordState = useSetRecoilState(selectedKeywordState)
  useEffect(() => {
    setSelectedKeywordState(keywordInfo)
    setKeywordAnalysisParamsState({
      topN: 6,
      typeId: -1,
      newsType: "ECONOMY",
      startDate: dayjs("2022-01-01").format("YYMMDD"),
      endDate: dayjs("2022-12-31").format("YYMMDD"),
    })
  }, [setKeywordAnalysisParamsState, setSelectedKeywordState, keywordInfo])

  return (
    <PageWrapper>
      <TitleDiv>
        {keywordInfo?.name}
        {!!sessionStorage.getItem("accessToken") && (
          <BookmarkBtn
            isBookmarked={isBookmarked}
            page="keyword"
            num={keywordInfo.id}
          />
        )}
      </TitleDiv>
      <ContentWrapper>
        <Suspense fallback={<LoadingComponent />}>
          <KeywordChartArea
            keyword={keywordInfo.name}
            keywordId={keywordInfo.id}
          />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <NewsArea keywordId={keywordInfo.id} keyword={keywordInfo.name} />
        </Suspense>
      </ContentWrapper>
    </PageWrapper>
  )
}

export default KeywordDetailContent

const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`

const ContentWrapper = styled.div`
  height: calc(100% - 50px);
  width: 100%;
  display: flex;
  gap: 3rem;
`
