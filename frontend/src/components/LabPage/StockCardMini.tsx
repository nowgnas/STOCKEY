import { StockCardType } from "./LabType"
import styled from "styled-components"

interface Props {
  item: StockCardType
}

// 추후 로고 이미지 경로 수정 예정
const StockCardMini = ({ item }: Props) => {
  return (
    <CardWrapper>
      <LogoImg src={`/logo_images/${item.name}.png`} />
      <LogoTxt>{item.name}</LogoTxt>
    </CardWrapper>
  )
}

export default StockCardMini

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  font-size: 1.2rem;
  font-weight: bold;

  background: #ffffff;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 24px;
  overflow: hidden;
`

const LogoImg = styled.img`
  width: 40%;
  height: 40%;
`

const LogoTxt = styled.div`
  overflow: hidden;
`
