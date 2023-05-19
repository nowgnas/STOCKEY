import styled, { css } from "styled-components"
import dayjs from "dayjs"
import { shimmer, shake } from "../../../Keyframes"
import { useState } from "react"

interface CurrentTradeHistoryProps {
  isSubmitted: boolean
}

const MyCurrentTradeHistoryCard = ({
  isSubmitted,
}: CurrentTradeHistoryProps) => {
  const currentTime = dayjs()
  const nextTradeTime = currentTime.add(1, "hour").startOf("hour")

  return (
    <CardWrapper isSubmitted={isSubmitted}>
      <CardHeader>오늘 {nextTradeTime.format("HH")}시</CardHeader>
      <CardImg
        src="/tradeLogos/bill.png"
        alt="card-img"
        isSubmitted={isSubmitted}
      />
      <CardFooter>
        {isSubmitted
          ? `${nextTradeTime.diff(currentTime, "minute")}분 후에 체결!`
          : "주문하러가기"}
      </CardFooter>
    </CardWrapper>
  )
}

export default MyCurrentTradeHistoryCard

const CardWrapper = styled.div<{ isSubmitted: boolean }>`
  // 레이아웃
  width: 150px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-right: 16px;

  // 스타일
  border-radius: 24px;
  font-weight: bold;
  background-color: var(--custom-purple-4);
  animation: ${shimmer("var(--custom-purple-1)")} 1.4s infinite;

  // 드래그 방지
  & p {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  // 미제출 시 포인터 커서
  ${({ isSubmitted }) => !isSubmitted && "cursor: pointer;"}

  // 미제출 시 '주문하러가기' 부분 확대
  ${({ isSubmitted }) =>
    !isSubmitted &&
    `
  &:hover p:last-child {
    transform: scale(1.06);
  }
  `}
`

const CardHeader = styled.p`
  // 스타일
  color: var(--custom-black);
  font-size: 1.7rem;
`
const CardImg = styled.img<{ isSubmitted: boolean }>`
  // 레이아웃
  width: 7em;
  height: 7em;

  // 스타일
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))
    ${({ isSubmitted }) => !isSubmitted && "grayscale(1)"};

  // 상호작용

  cursor: pointer;

  // 드래그 방지
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;

  // 제출 완료 시에는 아이콘 확대, 미제출 시에는 아이콘 흔들기
  &:hover {
    ${({ isSubmitted }) =>
      isSubmitted
        ? "transform: scale(1.1)"
        : css`
            animation: ${shake} 1s infinite;
          `}
  }
`
const CardFooter = styled.p`
  // 스타일
  color: var(--custom-purple-1);
  font-size: 1.6rem;
`
