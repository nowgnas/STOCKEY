import styled from "styled-components"

export type TradeReceiptItemType = {
  name: string // 종목명
  contractPrice: number // 체결 가격
  contractQuantity: number // 체결 수량
  orderQuantity: number // 주문 수량
}

interface Props {
  item: TradeReceiptItemType
  listWidth: number[]
}

const MyTradeReceiptItem = ({ item, listWidth }: Props) => {
  return (
    <ItemContainer>
      <ItemWrapper width={listWidth[0]}>{item.name}</ItemWrapper>
      <ItemWrapper width={listWidth[1]}>
        {item.contractPrice.toLocaleString("ko-kr")}원
      </ItemWrapper>
      <ItemWrapper width={listWidth[2]}>{item.contractQuantity}주</ItemWrapper>
      <ItemWrapper width={listWidth[3]}>{item.orderQuantity}주</ItemWrapper>
    </ItemContainer>
  )
}

export default MyTradeReceiptItem

export const ItemContainer = styled.div`
  width: 100%;
  min-height: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const ItemWrapper = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
  font-size: 1.4rem;
`
