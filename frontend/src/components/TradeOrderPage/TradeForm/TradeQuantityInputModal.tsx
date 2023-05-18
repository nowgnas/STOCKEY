import { ChangeEvent, useState, useEffect } from "react"
import dayjs from "dayjs"
import styled from "styled-components"

import { BasketList } from "./TradeForm"
import { setWithExpiry } from "./setWithExpire"

import { Button, Dialog, TextField } from "@mui/material"
import { DialogTitle } from "@mui/material"

export interface SimpleDialogProps {
  id?: number
  status?: string
  stockInfo?: {
    name: string
    currentPrice: number
    myStockNums?: number
  }
  open: boolean | undefined
}

interface Props extends SimpleDialogProps {
  modalDataHandler: (info: SimpleDialogProps) => void
  listHandler: (status: string) => void
}
const TradeQuantityInputModal = ({
  id,
  status,
  stockInfo,
  open,
  modalDataHandler,
  listHandler,
}: Props) => {
  const [inputValue, setInputValue] = useState<number>(1)
  const currentTime = Number(dayjs().format("H"))

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      status === "팔래요" &&
      Number(e.target.value) > Number(stockInfo?.myStockNums)
    ) {
      setInputValue(Number(stockInfo?.myStockNums))
      return
    }
    if (/^[1-9][0-9]*$/.test(e.target.value) && parseInt(e.target.value) >= 0) {
      setInputValue(Number(e.target.value))
    }
  }

  const confirmHandler = () => {
    if (inputValue <= 0) return
    const list = status === "팔래요" ? "sellList" : "buyList"

    let myList = localStorage.getItem(list)
      ? JSON.parse(localStorage.getItem(list)!).value
      : []

    let orderInfo = []
    if (myList.length > 0) {
      orderInfo = myList.filter((stock: BasketList) => {
        return stock.id === id
      })
    }
    let value = inputValue
    if (orderInfo.length > 0) {
      value =
        status === "살래요"
          ? value + orderInfo[0].quantity
          : value + orderInfo[0].quantity > Number(stockInfo?.myStockNums)
          ? stockInfo?.myStockNums
          : value + orderInfo[0].quantity

      myList = myList.filter((stock: BasketList) => {
        return stock.id !== id
      })
    }
    const item = {
      id,
      name: stockInfo?.name,
      quantity: value,
      myStockNums: stockInfo?.myStockNums,
      currentPrice: stockInfo?.currentPrice,
    }
    setWithExpiry(list, item, myList)
    listHandler(status!)
    modalDataHandler({ open: false, status, stockInfo, id })
  }

  useEffect(() => {
    setInputValue(1)
  }, [open])

  return (
    <Dialog open={open!} maxWidth="sm">
      <DialogTitleText>
        {status === "팔래요" ? "판매" : "구매"}할 수량을 입력해주세요!
      </DialogTitleText>
      <DialogBody>
        <BodyText>
          다음 정각인 {currentTime + 1}시 가격대로 판매합니다.{" "}
          {stockInfo?.myStockNums && `보유량: (${stockInfo.myStockNums}주)`}
        </BodyText>
        <StockInputDiv>
          <BodyText>{stockInfo?.name}</BodyText>
          <TextFieldComp
            value={inputValue}
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            variant="standard"
            onChange={inputHandler}
          />
          <BodyText>주</BodyText>
        </StockInputDiv>
        <ExpectPriceDiv>
          <BodyText>
            예상 가격:
            {stockInfo?.currentPrice ? stockInfo!.currentPrice * inputValue : 0}
            원
          </BodyText>
        </ExpectPriceDiv>
        <ModalButtonWrapper>
          <ButtonConfirmComp variant="contained" onClick={confirmHandler}>
            {status === "팔래요" ? "팔게요" : "살게요"}
          </ButtonConfirmComp>
          <ButtonCancelComp
            variant="contained"
            onClick={() => {
              modalDataHandler({ open: false, status, stockInfo, id })
            }}
          >
            취소할래요
          </ButtonCancelComp>
        </ModalButtonWrapper>
      </DialogBody>
    </Dialog>
  )
}

export default TradeQuantityInputModal

const DialogTitleText = styled(DialogTitle)`
  font-size: 24px !important;
  font-weight: bold !important;
`

const DialogBody = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 10% 10% 10%;
`
const BodyText = styled.p`
  display: flex;
  font-weight: bold;
`

const StockInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--custom-gray-3);
  border-radius: 24px;
  gap: 10px;
  height: 5rem;
`

const ModalButtonWrapper = styled(StockInputDiv)`
  border: none;
`
const TextFieldComp = styled(TextField)`
  & > div > input {
    text-align: end;
  }
`

const ButtonComp = styled(Button)`
  margin-top: 10% !important;
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

const ExpectPriceDiv = styled(StockInputDiv)`
  height: 2rem;
  border: none;
`
