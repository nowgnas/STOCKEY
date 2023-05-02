import { useState } from "react"
import styled from "styled-components"
import TradeBuySellBar from "./TradeBuySellBar"

interface Props {
  name: string
  industry: string
  currentPrice: number
  buyPrice?: number
  buyPop: number
  sellPop: number
}

interface ExpectedProfitProps {
  expectedProfit: number
}

const TradeStockItem = ({
  name,
  industry,
  currentPrice,
  buyPrice = undefined,
  buyPop,
  sellPop,
}: Props) => {
  // 숫자 포맷
  const internationalNumberFormat = new Intl.NumberFormat("en-US")

  const [isHover, setIsHover] = useState(false)
  const expectedProfit = currentPrice - buyPrice!

  const hoverControlHandler = (status: boolean) => {
    setIsHover(status)
  }
  return (
    <StockItemContainer
      onMouseEnter={() => hoverControlHandler(true)}
      onMouseLeave={() => hoverControlHandler(false)}
    >
      <StockItemWrapper>
        <StockImage src={`/logo_images/${name}.png`} />
        <StockInfo>
          <InfoText>{name}</InfoText>
          <SubText>{industry}</SubText>
        </StockInfo>
        <StockInfo>
          <SubText>현재가</SubText>
          <InfoText>{internationalNumberFormat.format(currentPrice)}</InfoText>
        </StockInfo>
        {buyPrice && (
          <>
            <StockInfo>
              <SubText>매입 단가</SubText>
              <InfoText>{internationalNumberFormat.format(buyPrice)}</InfoText>
            </StockInfo>
            <StockInfo>
              <SubText>예상 수익</SubText>
              <ExpectedProfitText expectedProfit={expectedProfit}>
                {expectedProfit > 0
                  ? `+${internationalNumberFormat.format(expectedProfit)}`
                  : `${internationalNumberFormat.format(expectedProfit)}`}
              </ExpectedProfitText>
            </StockInfo>
          </>
        )}
      </StockItemWrapper>
      {isHover && <TradeBuySellBar buyPop={buyPop} sellPop={sellPop} />}
    </StockItemContainer>
  )
}

export default TradeStockItem

const StockItemContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

const StockItemWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

const StockImage = styled.img`
  width: 10%;
  height: 100%;
`

const StockInfo = styled.section`
  display: flex;
  flex-direction: column;
`

const InfoText = styled.p`
  font-size: 10px;
  font-weight: bold;
  margin: 1px;
`

const SubText = styled.p`
  font-size: 8px;
  margin: 1px;
`

const ExpectedProfitText = styled.p<ExpectedProfitProps>`
  color: ${(prop) => (prop.expectedProfit > 0 ? "red" : "blue")};
  font-size: 12px;
  font-weight: bold;
  margin: 1px;
`
