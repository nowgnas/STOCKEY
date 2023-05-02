import styled from "styled-components"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
interface Props {
  name: string
  nums: number
}

const TradeBasketItem = ({ name, nums }: Props) => {
  const stockNumHandler = (status: string) => {
    switch (status) {
      case "up":
        //로컬 스토리지 개수 증가
        break
      case "down":
        // 로컬 스토리지 개수 감소
        break
    }
  }
  return (
    <>
      <StockLogoImage src={`/logo_images/${name}.png`} />
      <StockText>{name}</StockText>
      <StockNumsWrapper>
        <KeyboardArrowDownIcon
          color="info"
          onClick={() => stockNumHandler("down")}
        />
        <StockText>{nums}</StockText>
        <KeyboardArrowUpIcon
          color="warning"
          onClick={() => stockNumHandler("up")}
        />
      </StockNumsWrapper>
    </>
  )
}

export default TradeBasketItem

const StockLogoImage = styled.img`
  height: 90%;
  width: 10%;
`

const StockText = styled.p`
  font-size: 10px;
  font-weight: bold;
`

const StockNumsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  align-items: center;
`
