import KeywordBarGraph from "./KeywordBarGraph"
import KeyphraseList, { KeyphraseContainer } from "./KeyphraseList"
import { HighlightedSpan } from "../../StockDetailPage/MainSection/PriceSection/PriceSection"
import { useRecoilValue } from "recoil"
import { selectedStockState } from "../../../stores/StockMainAtoms"
import { AdsClick } from "@mui/icons-material"
import styled from "styled-components"
import { Suspense } from "react"
import LoadingComponent from "../../common/Loading/LoadingComponent"
import { useNavigate } from "react-router"

const KeywordBoard = () => {
  // 현재 선택된 주식 데이터 읽어오기
  const {
    idx,
    id,
    name: selectedStockName,
  } = useRecoilValue(selectedStockState)
  // const { idx: selectedKeywordIdx, id: keywordId } =
  //   useRecoilValue(selectedKeywordState)
  const navigate = useNavigate()
  const directToStockDetail = () => {
    navigate(`/stock/${id}`)
  }

  return (
    <BoardDiv>
      <BoardHeader>
        <BoardTitle>
          <HighlightedSpan
            // color={`var(--custom-${colors[selectedKeywordIdx]}-1)`}
            color="var(--custom-pink-1)"
          >
            키워드
          </HighlightedSpan>
          로 보는 이번 주 {selectedStockName} 소식💌
        </BoardTitle>
        <LinkBtn onClick={directToStockDetail}>
          <AdsClick fontSize="large" />
          <span>자세히 보러가기</span>
        </LinkBtn>
      </BoardHeader>
      <Suspense
        fallback={
          <KeyphraseContainer selectedIdx={1}>
            <LoadingComponent />
          </KeyphraseContainer>
        }
      >
        <KeyphraseList />
      </Suspense>
      <Suspense>
        <KeywordBarGraph />
      </Suspense>
    </BoardDiv>
  )
}

export default KeywordBoard

const BoardDiv = styled.div`
  background-color: #faf5f7;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 0% 3%;
  border-radius: 24px;
  height: 80vh;
`
const BoardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const BoardTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
`
const LinkBtn = styled.div`
  height: 30px;
  background: var(--custom-gradient-violet);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #544d4d;
  cursor: pointer;
  padding: 3px 10px;
  & > span {
    margin-left: 5px;
  }
  & * {
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  }
  &:hover {
    transform: scale(1.05);
  }
  &:hover > svg {
    transform: scale(1.05);
  }
`
