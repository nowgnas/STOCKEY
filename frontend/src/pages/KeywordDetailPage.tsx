import styled from "styled-components"
import KeywordDetailContent from "../components/KeywordDetailPage/KeywordDetailContent"
import NotFoundKeyword from "../components/KeywordDetailPage/NotFoundKeyword"
import { KeywordSearchState, KeywordType } from "../stores/KeywordPageAtoms"
import { useRecoilValue } from "recoil"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useKeywordSearch } from "../hooks/useKeywordSearch"

const KeywordDetailPage = () => {
  const params = useParams()
  const keywordParam = params.keywordName
  const searchKeywordInfo = useRecoilValue(KeywordSearchState)
  const [keywordInfo, setKeywordInfo] = useState<KeywordType | undefined>(
    searchKeywordInfo
  )
  const { data: keywordSearchResult, refetch } = useKeywordSearch(
    keywordParam,
    "keyword"
  )

  // 새로고침해서 recoil state가 사라진 경우 url 파라미터로 검색 시도
  useEffect(() => {
    if (!keywordInfo) {
      refetch()
      if (keywordSearchResult?.length) {
        setKeywordInfo(keywordSearchResult[0])
      }
    }
  }, [keywordSearchResult, keywordInfo, refetch])

  return (
    <PageWrapper>
      {!!keywordInfo ? (
        <KeywordDetailContent keywordInfo={keywordInfo} />
      ) : (
        <NotFoundKeyword />
      )}
    </PageWrapper>
  )
}

export default KeywordDetailPage

const PageWrapper = styled.div`
  height: 100vh;
  width: 83.33vw;
  padding: 36px;
`
