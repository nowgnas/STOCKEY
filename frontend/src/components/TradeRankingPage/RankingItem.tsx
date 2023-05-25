import styled from "styled-components"
import Slide from "@mui/material/Slide"
import Fade from "@mui/material/Fade"
import { Grid } from "@mui/material"
import { useState } from "react"
import { shimmer, fadeIn } from "../../Keyframes"
import Avatar, { genConfig } from "react-nice-avatar"
import Lottie from "lottie-react"
import LottieData from "./67650-aaaa.json"
import PeekedStockCarousel from "./PeekedStockCarousel"

export interface RankingProps {
  rank: number
  name: string
  asset: number
}

const RankingItem = ({ rank, name, asset }: RankingProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPeeking, setIsPeeking] = useState(false)
  const config = genConfig(name)

  return (
    <Grid item display="flex" flexDirection="column" rowGap={2} xs={12}>
      <RankWrapper
        item
        xs={12}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setIsPeeking(false)
        }}
        rank={asset > 15000000 ? rank : 4}
      >
        <div>
          <span>{rank}</span>
          <div style={{ position: "relative" }}>
            {/* 1 ~ 3등 프로필 이미지에 효과 주기 */}
            {rank <= 3 && asset > 15000000 && (
              <Lottie
                loop={true}
                autoplay={true}
                animationData={LottieData}
                style={{
                  position: "absolute",
                  left: "-6rem",
                  width: "18rem",
                  height: "18rem",
                  filter: `brightness(${1 - (rank - 1) * 0.2}) opacity(${
                    1 - (rank - 1) * 0.3
                  })`,
                }}
              />
            )}
            <Avatar
              shape="circle"
              {...config}
              style={{
                width: "6rem",
                height: "6rem",
                marginRight: "6rem",
              }}
            />
          </div>
          <span style={{ whiteSpace: "nowrap" }}>{name}</span>
        </div>
        <Fade
          in={!isHovered}
          mountOnEnter
          unmountOnExit
          easing="ease-in-out"
          timeout={{ enter: 500, exit: 0 }}
          children={
            <div>
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/parakeet/48/money-bag.png"
                alt="money-bag"
              />
              <span>{asset.toLocaleString()}</span>
            </div>
          }
        />

        <Slide
          direction="left"
          in={isHovered}
          mountOnEnter
          unmountOnExit
          timeout={{ enter: 500, exit: 0 }}
          children={
            <PeekBtn onClick={() => setIsPeeking(true)}>
              <img
                width="36"
                height="36"
                src="https://img.icons8.com/material/48/ski-mask.png"
                alt="ski-mask"
              />
              <span>주문서 엿보기</span>
            </PeekBtn>
          }
        />
      </RankWrapper>
      <PeekWrapper
        item
        xs={12}
        children={<PeekedStockCarousel />}
        show={isPeeking}
      />
    </Grid>
  )
}

export default RankingItem

const PeekWrapper = styled(Grid)<{ show: boolean }>`
  display: ${({ show }) => (show ? "flex" : "none")};
  animation: ${fadeIn} 0.7s ease-in-out;
`

export const RankWrapper = styled(Grid)<{ rank: number }>`
  // 레이아웃

  // 모든 div에 적용
  &,
  & div {
    display: flex;
    align-items: center;
  }

  justify-content: space-between;
  width: 100%;
  height: 120px;
  padding: 24px 60px;

  // 스타일
  background-color: white;
  border-radius: 24px;
  // var(--custom-mint) + opacity 0.15
  border: 4px solid
    ${({ rank }) =>
      rank <= 3
        ? `var(--custom-${["pink", "orange", "purple"][rank - 1]}-1)`
        : "#e9fbf5"};

  // 모든 span에 적용
  & span {
    margin: 0;
    font-weight: bold;
    font-size: 1.8vw;
  }

  // rank에 적용
  & span:nth-child(1) {
    margin-right: 24px;
    font-style: italic;
    font-size: 2.3vw;
  }

  & img {
    margin-right: 12px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));
  }

  // 상호작용
  &:hover {
    background-color: ${({ rank }) =>
      rank <= 3
        ? [
            "rgba(255, 216, 229, 0.3)",
            "rgba(255, 224, 208, 0.3)",
            "rgba(235, 230, 255, 0.3)",
          ][rank - 1]
        : "#e9fbf5"};
    transform: scale(1.02);
  }
`
const PeekBtn = styled.div`
  // 레이아웃
  padding-inline: 24px;
  height: 100%;

  // 스타일
  background-color: white;
  border-radius: 24px;

  // 상호작용
  animation: ${shimmer("white")} 1s infinite;
  cursor: pointer;

  & span {
    font-size: 1vw;
    font-style: italic;
  }
`
