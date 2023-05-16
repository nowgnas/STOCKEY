import styled from "styled-components"
import HelpIcon from "@mui/icons-material/Help"
import TradeBasketItem from "./TradeBasketItem"
import { useEffect, useMemo, useState } from "react"
import { useDrop } from "react-dnd"

import { BasketList } from "./TradeForm"
import { SimpleDialogProps } from "./TradeQuantityInputModal"
import { Grid } from "@mui/material"

interface Props {
  status: string
  text: string
  color: string
  data: BasketList[]
  myBalance: number
  modalDataHandler: (info: SimpleDialogProps) => void
  listHandler: (status: string) => void
}

interface ContainerProps {
  color: string
}

interface PriceTextProps {
  isOver: boolean
  status: string
}

const TradeBasketList = ({
  status,
  text,
  color,
  data,
  myBalance,
  modalDataHandler,
  listHandler,
}: Props) => {
  // 숫자 포맷
  const internationalNumberFormat = new Intl.NumberFormat("en-US")
  // 합계
  const [sumPrice, setSumPrice] = useState<number>(0)
  useEffect(() => {
    if (data && data.length > 0) {
      const sumPrice = data.reduce((sum, currValue) => {
        return sum + currValue.quantity * currValue.currentPrice
      }, 0)
      setSumPrice(sumPrice)
    }
  }, [data])

  const isOver = useMemo(() => {
    return sumPrice > myBalance
  }, [sumPrice])
  // '?' hover
  const [isHover, setIsHover] = useState(false)

  const [, dropRef] = useDrop(
    () => ({
      accept: status === "팔래요" ? ["SELL"] : ["BUY", "SELL"],
      drop: (item, monitor) => {
        if (monitor.canDrop()) {
          const itemInfo = item as {
            id: number
            name: string
            stockNums?: number
            currentPrice: number
          }
          modalDataHandler({
            id: itemInfo.id,
            status,
            stockInfo: {
              name: itemInfo.name,
              currentPrice: itemInfo.currentPrice,
              myStockNums: itemInfo.stockNums,
            },
            open: true,
          })
        }
      },
    }),
    []
  )

  return (
    <BasketContainer color={color} ref={dropRef}>
      <BasketHeader>{status}</BasketHeader>
      <BasketWrapper>
        {data?.map((data) => {
          return (
            <BasketItemSection
              container
              direction="row"
              justifyContent="space-between"
            >
              <TradeBasketItem
                id={data.id}
                name={data.name}
                quantity={data.quantity}
                myStockNums={data.myStockNums}
                currentPrice={data.currentPrice}
                status={status}
                listHandler={listHandler}
              />
            </BasketItemSection>
          )
        })}
      </BasketWrapper>
      <BasketItemSection container>
        <StatusText>
          예상 {text}
          <HelpIcon
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          />
        </StatusText>
        {isHover && (
          <InfoSection>
            <StatusText>
              {`9시 기준 가격으로 계산한 예상 수익이에요.\n실제 거래는 10시 가격 기준으로 체결됩니다.`}
            </StatusText>
          </InfoSection>
        )}
        {status == "살래요" && isOver ? (
          <OverText>위에서부터 체결이 진행됩니다.</OverText>
        ) : (
          ""
        )}
        <PriceText isOver={isOver} status={status}>
          {sumPrice ? internationalNumberFormat.format(sumPrice) : 0}원
        </PriceText>
      </BasketItemSection>
    </BasketContainer>
  )
}

export default TradeBasketList

const BasketContainer = styled.section<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 45%;
  padding: 3%;
  border-radius: 24px;
  background: var(${(props) => props.color});
`

const BasketHeader = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 3%;
`

const BasketWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
  padding: 5px 0 5px 0;
  gap: 5px;
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

const BasketItemSection = styled(Grid)`
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 10px;
  background: white;
  border-radius: 24px;
`

const StatusText = styled.p`
  display: flex;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
  white-space: pre-wrap;
`

const OverText = styled(StatusText)`
  color: var(--custom-increase-red);
`

const PriceText = styled(StatusText)<PriceTextProps>`
  color: ${(props) =>
    props.status === "살래요" && props.isOver ? "red" : "black"};
`

const InfoSection = styled.section`
  display: flex;
  position: absolute;
  align-content: center;
  background: var(--custom-gray-3);
  border-radius: 24px;
  min-width: max-content;
  height: 6rem;
  left: 25%;
`
