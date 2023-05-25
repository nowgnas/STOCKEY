import Paper from "@mui/material/Paper/Paper"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export interface StockProps {
  stockInfo: {
    id: number
    name: string
    price: number
    rate: number
  }
}

const StockCard = ({ stockInfo }: StockProps) => {
  const [hovered, setHoverd] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleMouseOver = () => {
    setHoverd(true)
  }
  const handleMouseOut = () => {
    setHoverd(false)
  }
  const handleClick = () => {
    navigate(`/stock/${stockInfo.id}`)
  }
  return (
    <GradientBorderBlock
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
      selected={hovered}
    >
      <ContentPaper elevation={0} selected={hovered}>
        <LogoImg src={`/logo_images/${stockInfo.name}.png`} />
        <StockInfoDiv>
          <StockName>{stockInfo.name}</StockName>
          <StockStatDiv>
            <StockPrice>{stockInfo.price.toLocaleString("ko-KR")}원</StockPrice>
            <PriceChange isIncreasing={stockInfo.rate > 0 ? true : false}>
              {`${stockInfo.rate > 0 ? "▲" : "▼"} ${stockInfo.rate.toFixed(
                2
              )}%`}
            </PriceChange>
          </StockStatDiv>
        </StockInfoDiv>
      </ContentPaper>
    </GradientBorderBlock>
  )
}

export default StockCard

const GradientBorderBlock = styled.div<{
  selected: boolean
}>`
  position: relative;
  width: ${({ selected }) => (selected ? "100%" : "95%")};
  background-image: ${({ selected }) =>
    selected
      ? "linear-gradient(#FAF5F7, #FAF5F7), linear-gradient(130deg, #99C2FF 0%, #FFA7D1 100%)"
      : "null"};
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  border: ${({ selected }) =>
    selected ? "5px solid transparent" : "5px solid #f8f8f8"};
  margin-bottom: 12px;
  ::after {
    content: "";
    padding-bottom: 100%;
    display: block;
  }
  transition: width 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
  }
`

const ContentPaper = styled(Paper)<{ selected: boolean }>`
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
  border-radius: 24px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.03);
`

const StockInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const StockName = styled.p`
  color: black;
  font-size: 1.7rem;
  font-weight: Bold;
  margin-bottom: 5%;
`

const StockStatDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

const StockPrice = styled.p`
  color: #8a8a8a;
  font-size: 1.3rem;
  margin-right: 5%;
  margin-block: 0px;
`
const PriceChange = styled.p<{ isIncreasing: boolean }>`
  font-size: 1.1rem;
  margin-block: 0px;
  color: ${({ isIncreasing }) => (isIncreasing ? "#FB6F6F" : "#72A6FA")};
`
