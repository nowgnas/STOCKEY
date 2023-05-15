import { Dialog } from "@mui/material";
import MyTradeReceiptList from "./MyTradeReceiptList";
import styled from "styled-components";

interface Props {
  date: string;
  open: boolean;
  tradeModalHandler: (status: boolean) => void;
}

// sample data
// 추후 query data
const sampleItem = {
  buyList: [
    {
      name: "naver",
      orderedQuantity: 12,
      contractedQuantity: 12,
      contractedAmount: 13200,
    },
    {
      name: "카카오",
      orderedQuantity: 12,
      contractedQuantity: 12,
      contractedAmount: 13200,
    },
    {
      name: "삼성전자",
      orderedQuantity: 12,
      contractedQuantity: 12,
      contractedAmount: 13200,
    },
  ],
  buyAmount: 548200,      // 없으면 0원
  sellList: [
    {
      name: "naver",
      orderedQuantity: 12,
      contractedQuantity: 12,
      contractedAmount: 13200,
    },
    {
      name: "카카오",
      orderedQuantity: 12,
      contractedQuantity: 12,
      contractedAmount: 13200,
    },
    {
      name: "삼성전자",
      orderedQuantity: 12,
      contractedQuantity: 12,
      contractedAmount: 13200,
    },
  ],
  sellAmount: 4890000,   // 없으면 0원
};

const MyTradeReceipt = ({ date, open, tradeModalHandler }: Props) => {
  // 해당 거래 총 순수익
  const totalAmount = sampleItem.sellAmount - sampleItem.buyAmount;

  return (
    <DialogContainer open={open}>
      <DialogWrapper>
        <TitleWrapper>{date} 거래 주문서</TitleWrapper>

        <SubTitleWrapper>
          {totalAmount >= 0
            ? `이번 거래로 총 ${totalAmount.toLocaleString("ko-kr")}원 벌었어요`
            : `이번 거래로 총 ${Math.abs(totalAmount).toLocaleString(
                "ko-kr"
              )}원 잃었어요`}
        </SubTitleWrapper>

        <MyTradeReceiptList
          type="sell"
          itemList={sampleItem.sellList}
          amount={sampleItem.sellAmount}
        />

        <MyTradeReceiptList
          type="buy"
          itemList={sampleItem.buyList}
          amount={sampleItem.buyAmount}
        />

        <ButtonComp
          color="rgba(114, 166, 250, 0.59)"
          onClick={() => tradeModalHandler(false)}
        >
          확인
        </ButtonComp>
      </DialogWrapper>
    </DialogContainer>
  );
};

export default MyTradeReceipt;

const DialogContainer = styled(Dialog)`
  & > .MuiDialog-container > .MuiPaper-root {
    height: 90%;  
    width: 60%;
    border-radius: 32px;
    ::-webkit-scrollbar {
      display: none;
    }
    @media (max-width: 1000px) {
      width: 50%;
    }
    @media (max-width: 600px) {
      width: 90%;
    }
  }
`;

const DialogWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  font-size: 2.4rem;
  font-weight: bold;
`;

const SubTitleWrapper = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
`;

const ButtonComp = styled.div<{ color: string }>`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.color};
  border-radius: 12px;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
`;
