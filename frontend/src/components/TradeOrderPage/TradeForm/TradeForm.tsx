import styled from "styled-components"

import TradeFormBalance from "./TradeFormBalance"
import Grid from "@mui/material/Grid"
import TradeStockList from "./TradeStockList"
import TradeBasketList from "./TradeBasketList"
import { CustomDragLayer } from "../../common/DragDrop/CustomDragLayer"
import { useEffect, useMemo, useState } from "react"
import dayjs from "dayjs"

import TradeQuantityInputModal from "./TradeQuantityInputModal"
import { SimpleDialogProps } from "./TradeQuantityInputModal"
import { Button } from "@mui/material"
import TradeConfirmModal from "./TradeConfirmModal"

export type BasketList = {
  id: number
  name: string
  quantity: number
  currentPrice: number
  myStockNums?: number
  time: string
}

const TradeForm = () => {
  // 더미데이터,,,,, 정각 단위로 useQuery써서 가져와야함
  const myBalance = 1000000

  // 판매 목록
  const [sellList, setSellList] = useState<BasketList[]>([])
  // 구매 목록
  const [buyList, setBuyList] = useState<BasketList[]>([])
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)

  const confirmModalHandler = (status: boolean) => {
    setConfirmModalOpen(status)
  }

  useEffect(() => {
    // 팔기 리스트 초기화
    const sell = localStorage.getItem("sellList")
      ? JSON.parse(localStorage.getItem("sellList")!)
      : ""
    if (sell && dayjs().isAfter(sell.expiry)) {
      localStorage.removeItem("sellList")
    } else {
      if (sell) setSellList(sell.value)
    }
    // 사기 리스트 초기화
    const buy = localStorage.getItem("buyList")
      ? JSON.parse(localStorage.getItem("buyList")!)
      : ""
    if (sell && dayjs().isAfter(sell.expiry)) {
      localStorage.removeItem("buyList")
    } else {
      if (buy) setBuyList(buy.value)
    }
  }, [])

  // modal에 줄 데이터들
  const [modalData, setModalData] = useState<SimpleDialogProps | undefined>()
  const modalDataHandler = (info: SimpleDialogProps) => {
    setModalData(info)
  }

  // 주식 개수 선택 모달 확인 눌렀을 경우 list 변경
  const listHandler = (status: string) => {
    if (status === "팔래요") {
      setSellList(
        localStorage.getItem("sellList")
          ? JSON.parse(localStorage.getItem("sellList")!).value
          : []
      )
    } else {
      setBuyList(
        localStorage.getItem("buyList")
          ? JSON.parse(localStorage.getItem("buyList")!).value
          : []
      )
    }
  }
  return (
    <>
      <Header>주문서 작성하기</Header>
      <TradeFormContainer container columns={13} justifyContent="center">
        <TradeFormWrapper item direction="column" md={6} xs={12}>
          <TradeFormBalance myBalance={myBalance} />
          <TradeStockList />
        </TradeFormWrapper>
        <TradeFormWrapper item md={6} xs={12}>
          <TradeBasketList
            status={"팔래요"}
            text={"수익"}
            color={"--custom-blue"}
            data={sellList}
            myBalance={myBalance}
            modalDataHandler={modalDataHandler}
            listHandler={listHandler}
          />
          <TradeBasketList
            status={"살래요"}
            text={"지출"}
            color={"--custom-pink-4"}
            data={buyList}
            myBalance={myBalance}
            modalDataHandler={modalDataHandler}
            listHandler={listHandler}
          />
        </TradeFormWrapper>
        <ButtonConfirmComp
          variant="contained"
          onClick={() => confirmModalHandler(true)}
        >
          주문서 제출하기
          <ConfirmImage src={"/tradeLogos/paymentCheck.png"} />
        </ButtonConfirmComp>
      </TradeFormContainer>
      <TradeQuantityInputModal
        id={modalData?.id}
        status={modalData?.status}
        stockInfo={modalData?.stockInfo}
        open={modalData?.open}
        modalDataHandler={modalDataHandler}
        listHandler={listHandler}
      />
      <TradeConfirmModal
        sellList={sellList}
        buyList={buyList}
        open={confirmModalOpen}
        confirmModalHandler={confirmModalHandler}
      />
      <CustomDragLayer />
    </>
  )
}

export default TradeForm
const TradeFormContainer = styled(Grid)`
  min-height: 90vh;
  max-height: 90vh;
  gap: 32px;

  @media (max-width: 900px) {
    min-height: 220vh;
    max-height: 260vh;
  }
`
const TradeFormWrapper = styled(Grid)`
  min-height: 80vh;
  max-height: 80vh;
  width: 100%;

  @media (max-width: 900px) {
    min-height: 120vh;
    max-height: 120vh;
  }
`
const Header = styled.p`
  font-size: 32px;
  font-weight: bold;
`
const ButtonConfirmComp = styled(Button)`
  width: 100%;
  height: 7rem;
  background-color: #625b71 !important;
  border-radius: 96px !important;
  font-size: 32px !important;
  font-weight: bold !important;
`
const ConfirmImage = styled.img``
