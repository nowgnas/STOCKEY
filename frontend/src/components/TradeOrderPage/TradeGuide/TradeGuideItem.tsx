import { Grid } from "@mui/material"
import styled from "styled-components"

interface Props {
  title: string
  mainText: string
  imageSrc: string
}

const TradeGuideItem = ({ title, mainText, imageSrc }: Props) => {
  return (
    <GuideItemWrapper item alignItems="flex-start" md={5} sm={7} xs={15}>
      <GuideImg src={`/tradeLogos/${imageSrc}.png`} alt="#" />
      <Header>{title}</Header>
      <MainTextWrapper>
        <MainText>{mainText}</MainText>
      </MainTextWrapper>
    </GuideItemWrapper>
  )
}

export default TradeGuideItem

const GuideItemWrapper = styled(Grid)`
  min-height: 110%;
  font-weight: bold;
  padding: 24px;

  border: 5px solid #ffffff;
  border-radius: 24px;
`

const GuideImg = styled.img`
  width: 30%;
  height: 30%;
  margin-top: 6px;

  @media (max-width: 768px) {
    width: 40%;
    height: 20%;
  }
`

const Header = styled.p`
  font-size: 18px;
  margin-top: 3%;
  margin-bottom: 3%;
  @media (max-width: 1072px) {
    font-size: 15px;
    margin-bottom: 5%;
  }
`

const MainTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  letter-spacing: 0.1px;
`

const MainText = styled.p`
  margin: 3%;
  font-size: 10px;
  color: #6d6666;
  white-space: pre-wrap;

  @media (max-width: 1072px) {
    font-size: 8px;
  }
`
