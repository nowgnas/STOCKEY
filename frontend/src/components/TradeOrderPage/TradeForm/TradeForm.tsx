import styled from "styled-components"
import { useEffect, useMemo, useState } from "react"
import dayjs from "dayjs"

import { useCheckOrder, useMyBalance } from "../../../hooks/useTradeForm"
import TradeFormBalance from "./TradeFormBalance"
import Grid from "@mui/material/Grid"
import TradeStockList from "./TradeStockList"
import TradeBasketList from "./TradeBasketList"
import { CustomDragLayer } from "../../common/DragDrop/CustomDragLayer"

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
  const { data: myBalance, isSuccess: isSuccessMyBalance } = useMyBalance()

  // 주문 여부 API
  const { data: isOrderSubmit, isSuccess: isSuccessCheck } = useCheckOrder()
  const [lockTrade, setLockTrade] = useState(false)
  // 판매 목록
  const [sellList, setSellList] = useState<BasketList[]>([])

  // 구매 목록
  const [buyList, setBuyList] = useState<BasketList[]>([])
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)

  const confirmModalHandler = (status: boolean) => {
    setConfirmModalOpen(status)
  }
  // localStorage 데이터 불러오기
  const getList = (status: string) => {
    const list = localStorage.getItem(status)
      ? JSON.parse(localStorage.getItem(status)!)
      : []
    if (list && dayjs().isAfter(list.expiry)) {
      localStorage.removeItem(status)
      return []
    }
    return list.value
  }

  useEffect(() => {
    if (isSuccessCheck) {
      setLockTrade(isOrderSubmit)
    }
    setSellList(getList("sellList"))
    setBuyList(getList("buyList"))
  }, [isOrderSubmit])

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
        <TradeFormWrapper item md={6} xs={12}>
          <TradeFormBalance
            myBalance={isSuccessMyBalance ? myBalance.deposit : 0}
          />
          <TradeStockList />
        </TradeFormWrapper>
        <TradeBasketWrapper item md={6} xs={12} justifyContent="space-between">
          {lockTrade && (
            <LockSection>
              <LockImg src={"/tradeLogos/Lock.png"} />
            </LockSection>
          )}
          <TradeBasketList
            status={"팔래요"}
            text={"수익"}
            color={"--custom-blue"}
            data={sellList}
            myBalance={isSuccessMyBalance ? myBalance.deposit : 0}
            modalDataHandler={modalDataHandler}
            listHandler={listHandler}
          />
          <TradeBasketList
            status={"살래요"}
            text={"지출"}
            color={"--custom-pink-4"}
            data={buyList}
            myBalance={isSuccessMyBalance ? myBalance.deposit : 0}
            modalDataHandler={modalDataHandler}
            listHandler={listHandler}
          />
        </TradeBasketWrapper>
        <ButtonConfirmComp
          disabled={lockTrade ? true : false}
          variant="contained"
          onClick={() => confirmModalHandler(true)}
          orderstatus={`${lockTrade}`}
        >
          {lockTrade ? (
            "주문 완료"
          ) : (
            <>
              주문서 제출하기
              <ConfirmImage src={"/tradeLogos/paymentCheck.png"} />
            </>
          )}
        </ButtonConfirmComp>
      </TradeFormContainer>
      {modalData && (
        <TradeQuantityInputModal
          id={modalData?.id}
          status={modalData?.status}
          stockInfo={modalData?.stockInfo}
          open={modalData.open}
          modalDataHandler={modalDataHandler}
          listHandler={listHandler}
        />
      )}
      <TradeConfirmModal
        sellList={sellList}
        buyList={buyList}
        open={confirmModalOpen}
        confirmModalHandler={confirmModalHandler}
        listHandler={listHandler}
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
  position: relative;
  max-height: 68vh;
  min-height: 68vh;

  @media (max-width: 900px) {
    min-height: 120vh;
    max-height: 120vh;
  }
`
const TradeBasketWrapper = styled(TradeFormWrapper)`
  display: flex;
  flex-direction: column !important;
`

const Header = styled.p`
  font-size: 32px;
  font-weight: bold;
`
const ButtonConfirmComp = styled(Button)<{ orderstatus: string }>`
  width: 100%;
  height: 7rem;
  background-color: #625b71 !important;
  border-radius: 96px !important;
  font-size: 32px !important;
  font-weight: bold !important;
  opacity: ${(props) => (props.orderstatus === "true" ? "50%" : "100%")};
  color: white !important;
`
const ConfirmImage = styled.img``

const LockSection = styled.section`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(255, 254, 254, 0.8);
  border-radius: 24px;
`

const LockImg = styled.img`
  width: 30%;
`
