import styled from "styled-components"
import TradeGuideItem from "./TradeGuideItem"
import { Grid } from "@mui/material"

const TradeGuideList = () => {
  return (
    <Container>
      <Header>거래 가이드</Header>
      <TradeGuideWrapper container direction="row" columns={16}>
        <TradeGuideItem
          title="거래는 어떻게 체결되나요?"
          mainText={`거래는 한 시간에 한번, 정각에 진행돼요.\n한 시간 동안 제출한 주문서대로 처리돼요.\n판매/구매 가격은 거래 시각의 현재가로 결정돼요.\n주문서 제출 시각은 거래 가격과 무관합니다.`}
          imageSrc="bell"
        />
        <TradeGuideItem
          title="잔액이 없어요."
          mainText={`잔액이 없으면 주식을 살 수 없어요.\n보유하고 있는 주식을 파는 것은 가능해요.\n잔액이 부족하면 주문 일부가 취소될 수 있어요.\n잔액은 매주 월요일 오전 6시에 초기화됩니다.`}
          imageSrc="piggybank"
        />
        <TradeGuideItem
          title="주문서를 수정하고 싶어요."
          mainText={`주문서는 한 라운드에 한 번만 제출할 수 있어요. \n제출 후에는 수정이 불가능합니다.\n제출한 주문서를 열람하는 것은 가능해요.\n다음 라운드에 새로운 주문을 제출할 수 있어요.`}
          imageSrc="income"
        />
      </TradeGuideWrapper>
    </Container>
  )
}

export default TradeGuideList

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
`

const Header = styled.p`
  font-size: 32px;
  font-weight: bold;
`

const TradeGuideWrapper = styled(Grid)`
  padding: 0px;
  gap: 12px;
`
