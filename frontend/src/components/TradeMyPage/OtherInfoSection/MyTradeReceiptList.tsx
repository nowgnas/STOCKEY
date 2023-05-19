import MyTradeReceiptItem, {
  TradeReceiptItemType,
  ItemContainer,
  ItemWrapper,
} from "./MyTradeReceiptItem"
import styled from "styled-components"

interface Props {
  type: "buy" | "sell"
  itemList: TradeReceiptItemType[]
}

const listWidth = [28, 30, 16, 16]

const MyTradeReceiptList = ({ type, itemList }: Props) => {
  return (
    <ContentWrapper>
      {type === "buy" ? (
        <ContentHeader color="var(--custom-increase-red)">샀어요</ContentHeader>
      ) : (
        <ContentHeader color="var(--custom-decrease-blue)">
          팔았어요
        </ContentHeader>
      )}

      <ContentBody>
        <ContentBodyHeader>
          <ItemContainer>
            <ItemWrapper width={listWidth[0]}>종목</ItemWrapper>
            <ItemWrapper width={listWidth[1]}>체결 가격</ItemWrapper>
            <ItemWrapper width={listWidth[2]}>체결 수량</ItemWrapper>
            <ItemWrapper width={listWidth[3]}>주문 수량</ItemWrapper>
          </ItemContainer>
        </ContentBodyHeader>

        {itemList.map((item) => {
          return (
            <MyTradeReceiptItem
              key={item.name}
              item={item}
              listWidth={listWidth}
            />
          )
        })}
      </ContentBody>

      {/* <ContentFooter>
      {
        type === "buy" ? (
          `지출 : ${amount.toLocaleString("ko-kr")}원`
        ) : (
          `수익 : ${amount.toLocaleString("ko-kr")}원`
        )
      }
    </ContentFooter> */}
    </ContentWrapper>
  )
}

export default MyTradeReceiptList

const ContentWrapper = styled.div`
  width: 100%;
  height: 36%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ContentHeader = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  height: 10%;
  font-size: 1.6rem;
  font-weight: bold;
`

const ContentBody = styled.div`
  width: 100%;
  height: 90%;
  border-radius: 24px;
  border: 4px solid #faf5f7;
  padding: 2% 2% 4% 4%;

  display: flex;
  flex-direction: column;
  gap: 2rem;

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

const ContentBodyHeader = styled.div`
  position: sticky;
  top: 0;
  font-weight: bold;
  background-color: white;
`

const ContentFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 1.6rem;
  font-weight: bold;
`
