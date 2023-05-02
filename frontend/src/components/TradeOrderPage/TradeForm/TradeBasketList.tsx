import styled from "styled-components"
import HelpIcon from "@mui/icons-material/Help"
import TradeBasketItem from "./TradeBasketItem"
import { useState } from "react"
interface Props {
  status: string
  text: string
  color: string
  data: { name: string; nums: number; currentPrice: number }[]
}

interface ContainerProps {
  color: string
}

const TradeBasketList = ({ status, text, color, data }: Props) => {
  // 숫자 포맷
  const internationalNumberFormat = new Intl.NumberFormat("en-US")

  // 합계
  const sumPrice = data.reduce((sum, currValue) => {
    return sum + currValue.nums * currValue.currentPrice
  }, 0)

  // '?' hover
  const [isHover, setIsHover] = useState(false)

  return (
    <BasketContainer color={color}>
      <BasketHeader>{status}</BasketHeader>
      <BasketWrapper>
        {data.map((data) => {
          return (
            <BasketItemSection>
              <TradeBasketItem name={data.name} nums={data.nums} />
            </BasketItemSection>
          )
        })}
      </BasketWrapper>
      <BasketItemSection>
        <StatusText>
          예상 {text}
          <HelpIcon
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          />
        </StatusText>
        {isHover && (
          <InfoSection>
            <StatusText>
              {`9시 기준 가격으로 계산한 예상 수익이에요.\n실제 거래는 10시 가격 기준으로 체결됩니다.`}
            </StatusText>
          </InfoSection>
        )}
        <StatusText>{internationalNumberFormat.format(sumPrice)}원</StatusText>
      </BasketItemSection>
    </BasketContainer>
  )
}

export default TradeBasketList

const BasketContainer = styled.section<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 45%;
  padding: 3%;
  border-radius: 24px;
  background: var(${(props) => props.color});

  margin: 2.5% 0 2.5% 0;
`

const BasketHeader = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 3%;
`

const BasketWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
  padding: 5px 0 5px 0;
  gap: 5px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 24px;
    border: 5px solid transparent;
    background-clip: padding-box;
  }
  ::-webkit-scrollbar-track {
    width: 12px;
  }
`

const BasketItemSection = styled.section`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 10px;
  background: white;
  border-radius: 24px;
`

const StatusText = styled.p`
  display: flex;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
  white-space: pre-wrap;
`

const InfoSection = styled.section`
  display: flex;
  position: absolute;
  align-content: center;
  background: var(--custom-gray-3);
  border-radius: 24px;
  min-width: max-content;
  height: 6rem;
  left: 20%;
`
