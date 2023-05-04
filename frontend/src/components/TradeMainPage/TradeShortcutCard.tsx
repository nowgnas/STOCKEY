import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { Paper } from "@mui/material"
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined"

interface Props {
  title: string
  content?: string
  navPage: string
  imageSrc: string
  bgColor: string
}

const TradeShortcutCard = ({
  title,
  content,
  navPage,
  imageSrc,
  bgColor,
}: Props) => {
  const navigate = useNavigate()

  const handleBtnClick = () => {
    navigate(navPage)
  }

  return (
    <CardBlock shouldNav={navPage ? true : false}>
      <CardWrapper bgColor={bgColor} onClick={handleBtnClick} elevation={0}>
        <CardTitle hasContent={content ? true : false}>
          <span>{title}</span>{" "}
          {navPage ? <ArrowCircleRightOutlinedIcon fontSize="large" /> : null}
        </CardTitle>
        <CardContent>{content}</CardContent>
        <LogoImage
          src={`/tradeLogos/${imageSrc}.png`}
          alt={imageSrc}
          hasContent={content ? true : false}
        />
      </CardWrapper>
    </CardBlock>
  )
}

export default TradeShortcutCard

const CardBlock = styled.div<{ shouldNav: boolean }>`
  // 항상 정사각형으로 유지하기 위한 속성
  position: relative;
  width: 100%;
  ::after {
    content: "";
    padding-bottom: 100%;
    display: block;
  }

  // navPage가 있을 때만 마우스 hover 시 pointer cursor로 변경
  cursor: ${({ shouldNav }) => (shouldNav ? "pointer" : "default")};
`
const CardWrapper = styled(Paper)<{ bgColor: string }>`
  // 배경 색상은 지정한 변수를 사용하도록 함
  background-color: ${({ bgColor }) => `var(${bgColor})`} !important;

  // 항상 정사각형으로 유지하기 위한 속성
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  // 기본 레이아웃 속성
  padding: 10%;
  overflow: hidden;
  border-radius: 24px !important;
  font-weight: bold;
`

const CardTitle = styled.div<{ hasContent: boolean }>`
  // content 여부에 따라 title 색상과 크기 조정
  color: ${({ hasContent }) =>
    hasContent ? "var(--custom-gray-1)" : "var(--custom-black)"};
  font-size: ${({ hasContent }) => (hasContent ? "1.5rem" : "2.2rem")};

  // 기본 레이아웃 속성
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const CardContent = styled.p`
  font-size: 3rem;
  text-align: center;
`

const LogoImage = styled.img<{ hasContent: boolean }>`
  // 항상 CardBlock 우측 하단에 위치
  position: absolute;
  bottom: ${({ hasContent }) => (hasContent ? "-20%" : "-6%")};
  right: 0px;

  // 크기는 카드 크기의 60%로 고정
  width: 60%;
  height: 60%;

  // 회전 및 그림자
  rotate: 350deg;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`
