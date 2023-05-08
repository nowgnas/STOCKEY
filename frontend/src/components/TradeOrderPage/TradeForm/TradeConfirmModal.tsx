import styled from "styled-components"

import { BasketList } from "./TradeForm"

import { Dialog, DialogTitle, Button } from "@mui/material"
import TradeConfirmModalList from "./TradeConfirmModalList"
interface Props {
  sellList: BasketList[]
  buyList: BasketList[]
  open: boolean
  confirmModalHandler: (status: boolean) => void
}

const TradeConfirmModal = ({
  sellList,
  buyList,
  open,
  confirmModalHandler,
}: Props) => {
  return (
    <DialogContainer open={open}>
      <DialogTitleText>거래 주문을 제출할까요?</DialogTitleText>
      <DialogBody>
        <BodyText>
          주문을 제출하고 나면 거래가 완료될 때까지 더 이상 수정할 수 없어요!
        </BodyText>
        <ComponentWrapper>
          <MainText color="var(--custom-pink-1)">살래요</MainText>
          <SubText color="var(--custom-pink-1)">({buyList.length}종목)</SubText>
        </ComponentWrapper>
        <TradeConfirmModalList status="MYBUY" list={buyList} />

        <ComponentWrapper>
          <MainText color="var(--custom-blue)">팔래요</MainText>
          <SubText color="var(--custom-blue)">({sellList.length}종목)</SubText>
        </ComponentWrapper>
        <TradeConfirmModalList status="MYSELL" list={sellList} />

        <ButtonWrapper>
          {/* API 통신시 제출 */}
          <ButtonConfirmComp variant="contained">제출할게요</ButtonConfirmComp>
          <ButtonCancelComp
            variant="contained"
            onClick={() => confirmModalHandler(false)}
          >
            취소할래요
          </ButtonCancelComp>
        </ButtonWrapper>
      </DialogBody>
    </DialogContainer>
  )
}

export default TradeConfirmModal

const DialogContainer = styled(Dialog)`
  & > .MuiDialog-container > .MuiPaper-root {
    height: 90%;
    width: 40%;
    border-radius: 32px;
    ::-webkit-scrollbar {
      display: none;
    }
    @media (max-width: 1000px) {
      width: 50%;
    }
    @media (max-width: 600px) {
      width: 80%;
    }
  }
`

const DialogTitleText = styled(DialogTitle)`
  font-size: 18px !important;
  font-weight: bold !important;
`
const DialogBody = styled.section`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 0 10% 5% 10%;
`

const BodyText = styled.p`
  display: flex;
  font-weight: bold;
  margin: 2%;
`

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const MainText = styled(BodyText)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 15px;
  margin: 1px;
`
const SubText = styled(MainText)`
  font-size: 8px;
`
const OrderList = styled.section`
  width: 100%;
  height: 50%;
  border: 1px solid var(--custom-gray-3);
  border-radius: 24px;
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

const ButtonWrapper = styled(ComponentWrapper)`
  justify-content: center;
  margin-top: 5%;
  gap: 16px;
`
const ButtonComp = styled(Button)`
  width: 40%;
  font-weight: bold !important;
  color: black !important;
`
const ButtonConfirmComp = styled(ButtonComp)`
  background-color: var(--custom-blue) !important;
`
const ButtonCancelComp = styled(ButtonComp)`
  background-color: var(--custom-gray-3) !important;
`
