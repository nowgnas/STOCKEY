import { KeywordPanelProps, PanelSubTitle } from "./KeywordPanel"
import { stockDetailState } from "../../../../stores/StockDetailAtoms"
import { useRecoilValue } from "recoil"
import styled, { keyframes } from "styled-components"
import { Grid, Tooltip, Zoom } from "@mui/material"
import { useCorrelationResult } from "../../../../hooks/useCorrelationResult"
import { keywordAnalysisParamsState } from "../../../../stores/StockDetailAtoms"
import { HighlightedSpan } from "../../MainSection/PriceSection/PriceSection"

const CorrelationResult = ({ keywordId, keyword }: KeywordPanelProps) => {
  const stockDetail = useRecoilValue(stockDetailState)
  const keywordAnalysisParams = useRecoilValue(keywordAnalysisParamsState)
  const { data: correlationResult } = useCorrelationResult(
    stockDetail?.id,
    keywordId,
    keywordAnalysisParams.startDate,
    keywordAnalysisParams.endDate
  )
  const badge =
    correlationResult !== undefined && Math.abs(correlationResult) >= 0.3
      ? true
      : false
  return (
    <>
      {correlationResult !== undefined && (
        <>
          <PanelSubTitle>
            {stockDetail?.name} 종목과의{" "}
            <HighlightedSpan color={"var(--custom-blue)"}>
              상관계수
            </HighlightedSpan>
            는?
          </PanelSubTitle>
          <ResultText>
            <Tooltip
              title="보통 절대값이 0.3 이상일 경우, 상관관계가 꽤 높다고 판단해요!"
              TransitionComponent={Zoom}
              placement="left"
              sx={{ fontSize: "2rem" }}
            >
              <ResultBadge badge={badge}>주목</ResultBadge>
            </Tooltip>
            <CorrValue resultValue={correlationResult}>
              {correlationResult.toFixed(4)}
            </CorrValue>{" "}
          </ResultText>
          <ResultDiv>
            <MinValueDiv color="pink" resultValue={correlationResult}>
              -1
            </MinValueDiv>

            <BarDiv resultValue={correlationResult}>
              <ZeroIndicator />
              <CircularIndicator
                resultValue={correlationResult}
              ></CircularIndicator>
            </BarDiv>

            <MaxValueDiv color="green" resultValue={correlationResult}>
              +1
            </MaxValueDiv>
          </ResultDiv>
        </>
      )}
    </>
  )
}

export default CorrelationResult

const changePlus = keyframes`
  0% {
    background-color: var(--custom-purple-4);
  }
  100% {
    background-color: var(--custom-green-4);
  }
`
const changeMinus = keyframes`
  0% {
    background-color: var(--custom-purple-4);
  }
  100% {
    background-color: var(--custom-pink-4);
  }
`

const slideToPlus = (value: number) => keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(${value}%);
    background-color: var(--custom-green-1);
    box-shadow: 0px 0px 10px 0px var(--custom-green-1);
  }
`
const slideToMinus = (value: number) => keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(${value}%);
    background-color: var(--custom-pink-1);
    box-shadow: 0px 0px 10px 0px var(--custom-pink-1);
  }
`
const slideToPlusValue = (value: number) => keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(${value}%);
  }
`
const slideToMinusValue = (value: number) => keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(${value}%);
  }
`
const zoomIn = keyframes`
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(0.9)
  }
  100% {
    transform: scale(1.8);
  }
`
const zoomOut = keyframes`
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(1.1)
  }
  100% {
    transform: scale(0.8);
  }
`
// const ResultText = styled.p`
//   font-size: 1.5rem;
//   font-weight: bold;
//   color: black;
//   margin-block: 3rem;
//   padding-inline: 2rem;
// `
const ResultDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-block: 1rem 3rem;
  padding-inline: 2rem;
`
const BarDiv = styled.div<{ resultValue: number }>`
  display: flex;
  justify-content: center;
  margin-inline: auto;
  width: 80%;
  background-color: var(--custom-purple-4);
  border-radius: 10px;
  animation: ${({ resultValue }) =>
      resultValue > 0 ? changePlus : changeMinus}
    1s ease-in-out 1s both;
`

const ZeroIndicator = styled.div`
  position: absolute;
  left: 50%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.5;
  // box-shadow: 0px 0px 10px 0px var(--custom-purple-1);
`
const CircularIndicator = styled.div<{ resultValue: number }>`
  z-index: 1;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--custom-purple-1);
  box-shadow: 0px 0px 20px 0px var(--custom-purple-1);
  animation: ${({ resultValue }) =>
      resultValue > 0
        ? slideToPlus(resultValue * 600)
        : slideToMinus(resultValue * 600)}
    1s ease-in-out 1s both;
`

const appear = keyframes`

  0% {
    opacity: 0;
    font-size: 0;
    color: transparent;
  }
  100% {
    opacity: 1;
    font-size: 3rem;
    color: black;
  }
`
const ResultText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
`
const ResultBadge = styled.div<{ badge: boolean }>`
  display: ${({ badge }) => (badge ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  padding: 0.6rem 1rem;
  background-color: var(--custom-orange-4);
  color: orange;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 20px;
  margin-right: 1rem;
  box-shadow: 0px 0px 5px 0px var(--custom-orange-1);
  // color: black;
  // padding-block: 1rem;
  // animation: ${appear} 1.2s ease-in-out 1.2s both;
`

const CorrValue = styled.div<{ resultValue: number }>`
  font-weight: bold;
  color: black;
  padding-block: 1rem;
  animation: ${appear} 1.2s ease-in-out 1.2s both;
`

const MinValueDiv = styled.div<{ color: string; resultValue: number }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--custom-pink-1);
  animation: ${({ resultValue }) => (resultValue < 0 ? zoomIn : zoomOut)} 1s
    ease-in-out 1s both;
`

const MaxValueDiv = styled.div<{ resultValue: number }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--custom-green-1);
  animation: ${({ resultValue }) => (resultValue > 0 ? zoomIn : zoomOut)} 1s
    ease-in-out 1s both;
`
