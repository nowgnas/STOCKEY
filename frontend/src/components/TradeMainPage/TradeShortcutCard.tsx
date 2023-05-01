import styled from "styled-components"
import { useNavigate } from "react-router-dom"

import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined"
import { Grid } from "@mui/material"

interface Props {
  status: string
}

const TradeShortcutCard = ({ status }: Props) => {
  const navigate = useNavigate()
  // status에 따라 텍스트 변경
  const text = status === "TRADE" ? "거래 참여하기" : "내 거래 현황"

  // navLink 변경
  const navPage = status === "TRADE" ? "order" : "my"

  // 이미지 변경
  const imageSrc = status === "TRADE" ? "bill" : "moneyBag"

  const handleBtnClick = () => {
    navigate(navPage)
  }

  return (
    <Wrapper status={status} onClick={handleBtnClick} md={4} sm={8} xs={11}>
      <CardText>
        <span>{text}</span> <ArrowCircleRightOutlinedIcon fontSize="large" />
      </CardText>
      <LogoImage src={`/tradeLogos/${imageSrc}.png`} alt={imageSrc} />
    </Wrapper>
  )
}

export default TradeShortcutCard

const Wrapper = styled(Grid)<Props>`
  background: ${(props) =>
    props.status === "TRADE"
      ? "var(--custom-purple-3)"
      : "var(--custom-orange-4)"};
  height: 100%;
  width: 30%;
  padding: 3rem;
  border-radius: 24px;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  @media (max-width: 500px) {
    font-size: 15px;
  }
`

const CardText = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 1.5rem;
`

const LogoImage = styled.img`
  position: relative;
  top: 25%;
  left: 30%;
  width: 20rem;
  height: 20rem;

  @media (max-width: 500px) {
    top: 25%;
    left: 10%;
  }
`
