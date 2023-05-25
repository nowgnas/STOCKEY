import styled from "styled-components"
import { useLocation } from "react-router-dom"

const StockeyLogo = () => {
  const curPath = useLocation().pathname

  return (
    <>
      <LogoDiv
        className={
          curPath === "/user/login" ||
          curPath === "/user/signup" ||
          curPath === "/oauth/kakao"
            ? "login"
            : undefined
        }
      >
        <LogoSpan>STOCKEY</LogoSpan>
        <TextDiv className="main">어려운 주식을 키워드로 쉽게</TextDiv>
        <TextDiv>10만건의 뉴스로부터 뽑아낸 키워드들로</TextDiv>
        <TextDiv>각 주식의 숨겨진 데이터를 찾아보세요</TextDiv>
      </LogoDiv>
    </>
  )
}

export default StockeyLogo

const LogoDiv = styled.div`
  // position
  position: absolute;

  z-index: 1;
  opacity: 0;

  // size
  width: 100%;
  height: 100%;

  // flex-box
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;

  // 드래그 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  // transition
  transition: all 0.3s ease-in-out;

  &.login {
    z-index: 1;
    opacity: 1;
  }
`

const LogoSpan = styled.span`
  // font
  font-family: ITC Benguiat Gothic Std;
  font-size: 8rem;
  font-weight: bold;

  // margin
  // margin-bottom: 10px;

  // font-gradient 적용
  background: var(--custom-gradient-pink);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const TextDiv = styled.div`
  // font
  font-family: Inter;
  font-size: 1.6rem;
  color: white;

  &.main {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
`
