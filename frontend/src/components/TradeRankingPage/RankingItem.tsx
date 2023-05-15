import styled from "styled-components"
import Slide from "@mui/material/Slide"
import { useState, useRef } from "react"
import { shimmer } from "../../Keyframes"
import Avatar, { genConfig } from "react-nice-avatar"
import Lottie from "react-lottie"
import LottieData from "./67650-aaaa.json"

export interface RankingProps {
  rank: number
  name: string
  account: number
}

const RankingItem = ({ rank, name, account }: RankingProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const config = genConfig({
    bgColor:
      rank <= 3
        ? `var(--custom-${["pink", "orange", "purple"][rank - 1]}-2)`
        : undefined,
  })

  return (
    <ItemWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={containerRef}
      rank={rank}
    >
      <div>
        <span>{rank}</span>
        <div style={{ position: "relative" }}>
          {/* 1 ~ 3등 프로필 이미지에 효과 주기 */}
          {rank <= 3 && (
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: LottieData,
              }}
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
        <span>{name}</span>
      </div>
      <Slide
        direction="up"
        in={!isHovered}
        mountOnEnter
        unmountOnExit
        container={containerRef.current}
        timeout={{ enter: 200, exit: 0 }}
        children={
          <div>
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/parakeet/48/money-bag.png"
              alt="money-bag"
            />
            <span>{account.toLocaleString()}</span>
          </div>
        }
      />

      <Slide
        direction="left"
        in={isHovered}
        mountOnEnter
        unmountOnExit
        container={containerRef.current}
        timeout={{ enter: 500, exit: 0 }}
        children={
          <PeekBtn>
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
    </ItemWrapper>
  )
}

export default RankingItem

export const ItemWrapper = styled.div<{ rank: number }>`
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
