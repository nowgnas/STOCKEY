import styled from "styled-components"
import NewsSection from "../StockDetailPage/SubPanel/KeywordPanel/NewsSection"
import { HighlightedSpan } from "../StockDetailPage/MainSection/PriceSection/PriceSection"

interface Props {
  keywordId: number
  keyword: string
}

const NewsArea = ({ keywordId, keyword }: Props) => {
  return (
    <AreaDiv>
      <TitleDiv>
        <HighlightedSpan color="var(--custom-purple-1)">
          {keyword}
        </HighlightedSpan>
        {" 키워드와 관련된 기사"}
      </TitleDiv>
      <ScrollDiv>
        <NewsSection keywordId={keywordId} keyword={keyword} />
      </ScrollDiv>
    </AreaDiv>
  )
}

export default NewsArea

const AreaDiv = styled.div`
  width: 40%;
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

const ScrollDiv = styled.div`
  overflow-y: scroll;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`
