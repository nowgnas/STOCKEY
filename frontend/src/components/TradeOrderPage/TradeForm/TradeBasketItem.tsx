import { ChangeEvent, useState } from "react"
import styled from "styled-components"
import dayjs from "dayjs"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

import { setWithExpiry } from "./setWithExpire"
import { BasketList } from "./TradeForm"
import { Button, Grid, TextField } from "@mui/material"

interface Props {
  id: number
  name: string
  quantity: number
  status: string
  myStockNums?: number
  currentPrice: number
  listHandler: (status: string) => void
}

const TradeBasketItem = ({
  id,
  name,
  quantity,
  status,
  myStockNums,
  currentPrice,
  listHandler,
}: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [editValue, setEditValue] = useState<number>(quantity)
  const editHandler = () => {
    setIsEdit(true)
  }
  const editValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditValue(Number(e.target.value))
  }

  const stockNumHandler = (nums: number) => {
    const list = status === "팔래요" ? "sellList" : "buyList"

    let myList = JSON.parse(localStorage.getItem(list)!).value

    // 개수
    let value
    if (status === "살래요") {
      value = quantity + nums < 0 ? 0 : quantity + nums
    } else {
      value =
        quantity + nums > myStockNums!
          ? myStockNums
          : quantity + nums < 0
          ? 0
          : quantity + nums
    }
    const info = {
      id,
      name,
      quantity: value,
      myStockNums: myStockNums,
      currentPrice: currentPrice,
    }
    value === 0
      ? (myList = myList.filter((stock: BasketList) => {
          return stock.id !== id
        }))
      : (myList = myList.map((stock: BasketList) => {
          if (stock.id === id) return info
          else return stock
        }))
    setEditValue(info.quantity!)
    setWithExpiry(list, null, myList)
    listHandler(status)
  }

  return (
    <>
      <StockLogoImage src={`/logo_images/${name}.png`} />
      <StockText>{name}</StockText>
      <StockNumsWrapper item xs={3} justifyContent="space-between">
        {isEdit ? (
          <>
            <TextFieldComp
              value={editValue}
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              variant="standard"
              onChange={editValueHandler}
            />
            <ButtonComp
              variant="contained"
              onClick={() => {
                stockNumHandler(editValue - quantity)
                setIsEdit(false)
              }}
            >
              변경
            </ButtonComp>
          </>
        ) : (
          <>
            <KeyboardArrowDownIcon
              color="info"
              onClick={() => {
                stockNumHandler(-1)
              }}
            />
            <StockText onClick={editHandler}>{quantity}</StockText>
            <KeyboardArrowUpIcon
              color="warning"
              onClick={() => stockNumHandler(1)}
            />
          </>
        )}
      </StockNumsWrapper>
    </>
  )
}

export default TradeBasketItem

const StockLogoImage = styled.img`
  height: 90%;
  width: 10%;
  border-radius: 16px;
`

const StockText = styled.p`
  font-size: 10px;
  font-weight: bold;
`

const StockNumsWrapper = styled(Grid)`
  display: flex;
  flex-direction: row;
  gap: 2px;
  align-items: center;
`

const TextFieldComp = styled(TextField)`
  & > div > input {
    text-align: end;
  }
`
const ButtonComp = styled(Button)`
  min-width: 40% !important;
  width: 40% !important;
  padding: 1px 1px !important;
  font-weight: bold !important;
  color: black !important;
`
