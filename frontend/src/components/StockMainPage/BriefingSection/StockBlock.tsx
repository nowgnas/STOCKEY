import Paper from "@mui/material/Paper"
import styled from "styled-components"
import { useRecoilState, useSetRecoilState } from "recoil"
import { selectedStockState } from "../../../stores/StockMainAtoms"
import { selectedKeywordState } from "../../../stores/StockMainAtoms"

interface Props {
  stockId: number
  index: number
  stockName: string
  currentPrice: number
  priceChange: number
}

const StockBlock = ({
  stockId,
  index,
  stockName,
  currentPrice,
  priceChange,
}: Props) => {
  const [selectedStock, setSelectedStock] = useRecoilState(selectedStockState)
  const setSelectedKeyword = useSetRecoilState(selectedKeywordState)
  const clickHandler = () => {
    setSelectedKeyword({ id: 0, idx: 1 })
    setSelectedStock({ idx: index, id: stockId, name: stockName })
  }

  return (
    <GradientBorderBlock
      onClick={clickHandler}
      selected={index === selectedStock?.idx ? true : false}
    >
      <ContentPaper
        elevation={0}
        selected={index === selectedStock?.idx ? true : false}
      >
        <LogoImg src={`logo_images/${stockName}.png`} />
        <StockInfoDiv>
          <StockName>{stockName}</StockName>
          <StockStatDiv>
            <StockPrice>{currentPrice.toLocaleString("ko-KR")}원</StockPrice>
            <PriceChange isIncreasing={priceChange > 0 ? true : false}>
              {`${priceChange > 0 ? "▲" : "▼"} ${priceChange.toFixed(2)}%`}
            </PriceChange>
          </StockStatDiv>
        </StockInfoDiv>
      </ContentPaper>
    </GradientBorderBlock>
  )
}

export default StockBlock

export const GradientBorderBlock = styled.div<{
  selected: boolean
}>`
  position: relative;
  width: ${({ selected }) => (selected ? "100%" : "90%")};
  background-image: ${({ selected }) =>
    selected
      ? "linear-gradient(#FAF5F7, #FAF5F7), linear-gradient(130deg, #99C2FF 0%, #FFA7D1 100%)"
      : "null"};
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-radius: 40px;
  border: ${({ selected }) =>
    selected ? "7px solid transparent" : "5px solid #f8f8f8"};
  margin-bottom: 12px;
  ::after {
    content: "";
    padding-bottom: 100%;
    display: block;
  }
  transition: width 0.2s ease-in-out;
`

export const ContentPaper = styled(Paper)<{ selected: boolean }>`
  && {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 40px;
    padding: 16%;
    background-color: ${({ selected }) => (selected ? "#FAF5F7" : "white")};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    & * {
      transform: ${({ selected }) => (selected ? "scale(1.05)" : "")};
      transform-origin: left;
      transition: transform 0.2s ease-in-out;
    }
  }
`

const LogoImg = styled.img`
  width: 30%;
  height: 30%;
  max-width: 100px;
  // border-radius: 24px;
  // box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.03);
`

const StockInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1vw;
`

const StockName = styled.p`
  color: black;
  font-size: 1.3em;
  font-weight: Bold;
  margin-bottom: 5%;
  white-space: nowrap;
  overflow: hidden;
`

const StockStatDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

const StockPrice = styled.p`
  color: #8a8a8a;
  font-size: 1em;
  margin-right: 5%;
  margin-block: 0px;
  white-space: nowrap;
  overflow: hidden;
`
const PriceChange = styled.p<{ isIncreasing: boolean }>`
  font-size: 0.7em;
  margin-block: 0px;
  color: ${({ isIncreasing }) => (isIncreasing ? "#FB6F6F" : "#72A6FA")};
`
