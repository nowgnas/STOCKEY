import { PanelSubTitle } from "../../SubPanel/KeywordPanel/KeywordPanel"
import StockPriceChart from "./StockPriceChart"
import styled from "styled-components"

const PriceSection = () => {
  return (
    <>
      <PanelSubTitle>
        <HighlightedSpan color={"var(--custom-mint)"}>키워드</HighlightedSpan>로
        보는 주가 차트
      </PanelSubTitle>
      <StockPriceChart />
    </>
  )
}

export default PriceSection

export const HighlightedSpan = styled.span<{ color: string; size?: string }>`
  color: ${({ color }) => color};
  font-size: ${({ size }) => (size ? size : null)};
  font-weight: bold;
`
