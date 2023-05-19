import styled from "styled-components"

import {
  SubmitProps,
  useSubmitTradeMutation,
} from "../../../hooks/useTradeForm"
import { BasketList } from "./TradeForm"
import TradeConfirmModalList from "./TradeConfirmModalList"

import { Dialog, DialogTitle, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"

interface Props {
  sellList: BasketList[]
  buyList: BasketList[]
  open: boolean
  confirmModalHandler: (status: boolean) => void
  listHandler: (status: string) => void
}

const TradeConfirmModal = ({
  sellList,
  buyList,
  open,
  confirmModalHandler,
  listHandler,
}: Props) => {
  const [submitList, setSubmitList] = useState<SubmitProps[]>([])
  const { mutate: submit, isSuccess, isError } = useSubmitTradeMutation()
  const queryClient = useQueryClient()
  const formatList = (myList: BasketList[], status: string) => {
    const formatList = myList.map((stock) => {
      return { stockId: stock.id, count: stock.quantity, orderType: status }
    })
    return formatList
  }
  const submitListHandler = () => {
    submit(submitList)
  }

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["oneMinute"] })
      alert("주문이 제출되었습니다!")
      confirmModalHandler(false)
    }
  }, [isSuccess])

  useEffect(() => {
    let formatSellList: SubmitProps[] = []
    let formatBuyList: SubmitProps[] = []
    if (sellList) {
      formatSellList = formatList(sellList, "SELL")
    }
    if (buyList) {
      formatBuyList = formatList(buyList, "BUY")
    }
    setSubmitList([...formatSellList, ...formatBuyList])
  }, [open, sellList, buyList])

  return (
    <DialogContainer open={open}>
      <DialogTitleText>거래 주문을 제출할까요?</DialogTitleText>
      <DialogBody>
        <BodyText>
          주문을 제출하고 나면 거래가 완료될 때까지 더 이상 수정할 수 없어요!
        </BodyText>

        <ComponentWrapper>
          <MainText color="var(--custom-decrease-blue)">팔래요</MainText>
          <SubText color="var(--custom-decrease-blue)">
            ({sellList && sellList.length > 0 ? sellList.length : 0}종목)
          </SubText>
        </ComponentWrapper>
        <TradeConfirmModalList
          status="MYSELL"
          list={sellList}
          listHandler={listHandler}
        />

        <ComponentWrapper>
          <MainText color="var(--custom-increase-red)">살래요</MainText>
          <SubText color="var(--custom-increase-red)">
            ({buyList && buyList.length > 0 ? buyList.length : 0}종목)
          </SubText>
        </ComponentWrapper>
        <TradeConfirmModalList
          status="MYBUY"
          list={buyList}
          listHandler={listHandler}
        />

        <ButtonWrapper>
          {/* API 통신시 제출 */}
          <ButtonConfirmComp
            variant="contained"
            onClick={() => {
              submitListHandler()
            }}
          >
            제출할게요
          </ButtonConfirmComp>
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

export const DialogContainer = styled(Dialog)`
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
