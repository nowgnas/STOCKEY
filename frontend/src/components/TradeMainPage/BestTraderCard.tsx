import styled from "styled-components"
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined"
import BestTraderCarousel from "./BestTraderCarousel"
import Lottie from "lottie-react"
import LottieData from "./fanfare.json"
import { useNavigate } from "react-router-dom"

const BestTraderCard = () => {
  const navigate = useNavigate()

  return (
    <CardWrapper
      onClick={() => {
        navigate("/trade/ranking")
      }}
    >
      <CardHeader>
        이번 주 투자왕
        <ArrowCircleRightOutlinedIcon />
      </CardHeader>
      <BestTraderCarousel />
      <Lottie
        loop={true}
        autoplay={true}
        animationData={LottieData}
        style={{
          position: "absolute",
          rotate: "270deg",
          bottom: "-22%",
          right: "-18%",
          width: "100%",
          height: "100%",
          opacity: "0.9",
        }}
      ></Lottie>
    </CardWrapper>
  )
}

export default BestTraderCard

const CardWrapper = styled.div`
  // 레이아웃
  width: 100%;
  position: relative;
  padding: 2.4rem 0 0 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  // 스타일
  background-color: var(--custom-pink-4);
  border-radius: 24px;
`
const CardHeader = styled.div`
  // 레이아웃
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.4rem;
  margin-bottom: 10%;

  // 스타일
  font-size: 2.4vw;
  font-weight: bold;

  // 아이콘
  & > svg {
    font-size: 120%;
    cursor: pointer;
  }
`
