import { useState } from "react"
import styled, { keyframes } from "styled-components"
import KeywordResult from "./KeywordResult"
import { triggerScroll } from "../../../common/Functions/triggerScroll"

const AnalysisSection = () => {
  const [isStarted, setIsStarted] = useState(false)
  const handleClick = () => {
    setIsStarted(!isStarted)
    setTimeout(() => {
      triggerScroll("analyzeResultRef")
    }, 50)
  }

  return (
    <AnalysisBox isStarted={isStarted}>
      <AnalysisBtn isStarted={isStarted} onClick={handleClick}>
        뉴스 키워드 분석하기 🔍
      </AnalysisBtn>
      <AnalysisResult isStarted={isStarted} id="analyzeResultRef">
        <KeywordResult />
      </AnalysisResult>
    </AnalysisBox>
  )
}

export default AnalysisSection
export const hide = keyframes`
  0% {
    display: block;
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
  `
export const show = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    display: block;
  }
  `

const AnalysisBox = styled.div<{ isStarted: boolean }>`
  background: ${({ isStarted }) =>
    isStarted ? "transparent" : "var(--custom-gradient-violet)"};
  border-radius: 24px;
  cursor: ${({ isStarted }) => (isStarted ? "" : "pointer")};
  padding: 0;
  box-shadow: ${({ isStarted }) =>
    isStarted
      ? "0 0 10px 1px rgba(0, 0, 0, 0.1)"
      : "0 0 10px 1px rgba(0, 0, 0, 0.25)"};
  transition: all 0.5s ease-in-out;
`

const AnalysisBtn = styled.div<{ isStarted: boolean }>`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
  animation: ${({ isStarted }) => (isStarted ? hide : show)} 1s linear;
  animation-fill-mode: both;
  display: ${({ isStarted }) => (!isStarted ? "block" : "none")};
  padding: 5%;
  &:hover {
    transform: scale(1.1);
  }
`

const AnalysisResult = styled.div<{ isStarted: boolean }>`
  animation: ${({ isStarted }) => (isStarted ? show : hide)} 1s linear;
  animation-fill-mode: both;
  display: ${({ isStarted }) => (isStarted ? "block" : "none")};
`
