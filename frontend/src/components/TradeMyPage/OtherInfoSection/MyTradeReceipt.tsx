import { Dialog } from "@mui/material"
import MyTradeReceiptList from "./MyTradeReceiptList"
import styled from "styled-components"

interface Props {
  date: string
  open: boolean
  buyList: any
  sellList: any
  realizedProfit: number
  tradeModalHandler: (status: boolean) => void
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
  buyAmount: 548200, // 없으면 0원
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
  sellAmount: 4890000, // 없으면 0원
}

const MyTradeReceipt = ({
  date,
  open,
  buyList,
  sellList,
  realizedProfit,
  tradeModalHandler,
}: Props) => {
  return (
    <DialogContainer open={open}>
      <DialogWrapper>
        <TriangleArr cnt={15} position="top" />

        <TitleWrapper>{date} 거래 주문서</TitleWrapper>

        <SubTitleWrapper>
          {realizedProfit >= 0
            ? `이번 거래로 총 ${realizedProfit.toLocaleString(
                "ko-kr"
              )}원 벌었어요`
            : `이번 거래로 총 ${Math.abs(realizedProfit).toLocaleString(
                "ko-kr"
              )}원 잃었어요`}
        </SubTitleWrapper>

        <MyTradeReceiptList type="sell" itemList={sellList} />

        <MyTradeReceiptList type="buy" itemList={buyList} />

        <ButtonComp
          color="rgba(114, 166, 250, 0.59)"
          onClick={() => tradeModalHandler(false)}
        >
          확인
        </ButtonComp>

        <TriangleArr cnt={15} position="bottom" />
      </DialogWrapper>
    </DialogContainer>
  )
}

export default MyTradeReceipt

const DialogContainer = styled(Dialog)`
  & > .MuiDialog-container > .MuiPaper-root {
    height: 85%;
    width: 60%;
    overflow-y: visible;
    border-radius: 0px;
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
`

const DialogWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`

const TitleWrapper = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
`

const SubTitleWrapper = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  border: 4px solid #faf5f7;
  border-radius: 12px;
  padding: 0.5rem;
`

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
`

// 영수증 형태 css
interface TriangelArrProps {
  cnt: number
  position: string
}
const TriangleArr = ({ cnt, position }: TriangelArrProps) => {
  const arr = []
  for (let i = 0; i < cnt; i++) {
    arr.push(i)
  }

  return (
    <TriangelWrapper position={position}>
      {arr.map((num) => {
        return <Triangle key={num} position={position} />
      })}
    </TriangelWrapper>
  )
}

const TriangelWrapper = styled.div<{ position: string }>`
  position: absolute;
  ${(props) => props.position}: -24px;
  left: 0;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
`

const Triangle = styled.div<{ position: string }>`
  width: 40px;
  border-left: 18px solid transparent;
  border-right: 18px solid transparent;
  border-${(props) =>
    props.position === "top" ? "bottom" : "top"}: 24px solid white;
`
