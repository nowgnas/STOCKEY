import styled from "styled-components"

interface TradeHistoryProps {
  date: string
  realizedProfit: number
}

const MyTradeHistoryCard = ({ date, realizedProfit }: TradeHistoryProps) => {
  // 실현 손익이 +, -, 0 인 경우에 따라 부호를 다르게 표시
  const profit =
    realizedProfit > 0
      ? `+ ${realizedProfit.toLocaleString()}`
      : realizedProfit < 0
      ? `- ${Math.abs(realizedProfit).toLocaleString()}`
      : `0`

  // 실현 손익이 +, -, 0 인 경우에 따라 폰트 색상을 다르게 표시
  const footerClassName =
    realizedProfit > 0
      ? "positive"
      : realizedProfit < 0
      ? "negative"
      : "neutral"

  return (
    <CardWrapper>
      <CardHeader>{date}</CardHeader>
      <CardImg src="/tradeLogos/bill.png" alt="card-img" />
      <CardFooter className={footerClassName}>{profit}원</CardFooter>
    </CardWrapper>
  )
}

export default MyTradeHistoryCard

const CardWrapper = styled.div`
  // 레이아웃
  width: 150px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-right: 16px;

  // 스타일
  border-radius: 24px;
  background-color: white;
  font-weight: bold;

  // 드래그 방지
  & p {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`

const CardHeader = styled.p`
  // 스타일
  color: var(--custom-gray-1);
  font-size: 1.7rem;
`
const CardImg = styled.img`
  // 레이아웃
  width: 7em;
  height: 7em;

  // 그림자 및 커서
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  cursor: pointer;

  // 호버 시 아이콘만 확대
  &:hover {
    transform: scale(1.1);
  }

  // 드래그 방지
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
`
const CardFooter = styled.p`
  font-size: 1.6rem;
`
