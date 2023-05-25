import ProfileInfo from "./ProfileInfo"
import PageLinkBtn from "./PageLinkBtn"
import LogoutBtn from "./LogoutBtn"
import StockeyLogo from "./StockeyLogo"
import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { useNickname } from "../../../hooks/useNickname"
// recoil
import { useRecoilValue } from "recoil"
import { logInState, nicknameState } from "../../../stores/atoms"

interface Props {
  isNarrow: boolean
}

const Navbar = ({ isNarrow }: Props) => {
  const curPath = useLocation().pathname
  const { data: nickname } = useNickname()
  const isLogin = useRecoilValue(logInState)
  // const nickname = useRecoilValue(nicknameState)

  const isSeleted = (name: string) => {
    if (curPath.startsWith("/stock") && name === "주식 종목") {
      return true
    } else if (curPath.startsWith("/industry") && name === "산업 정보") {
      return true
    } else if (curPath.startsWith("/keyword") && name === "키워드") {
      return true
    } else if (curPath === "/my" && name === "북마크") {
      return true
    } else if (curPath.startsWith("/lab") && name === "실험실") {
      return true
    } else if (curPath.startsWith("/trade") && name === "모의투자") {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <NavWrapper className={!!isNarrow ? "isLoading" : undefined}>
        <StockeyLogo />
        <NavbarDiv
          className={
            curPath === "/user/login" ||
            curPath === "/user/signup" ||
            curPath === "/oauth/kakao"
              ? "login"
              : undefined
          }
        >
          <ProfileInfo isNarrow={isNarrow} />

          <PageLinkBtn
            name="주식 종목"
            selected={isSeleted("주식 종목")}
            isNarrow={isNarrow}
          />
          <PageLinkBtn
            name="산업 정보"
            selected={isSeleted("산업 정보")}
            isNarrow={isNarrow}
          />
          <PageLinkBtn
            name="키워드"
            selected={isSeleted("키워드")}
            isNarrow={isNarrow}
          />
          <PageLinkBtn
            name="북마크"
            selected={isSeleted("북마크")}
            isNarrow={isNarrow}
          />
          <PageLinkBtn
            name="실험실"
            selected={isSeleted("실험실")}
            isNarrow={isNarrow}
          />
          <PageLinkBtn
            name="모의투자"
            selected={isSeleted("모의투자")}
            isNarrow={isNarrow}
          />
          {/* {sessionStorage.getItem("accessToken") && (
            <LogoutBtn isNarrow={isNarrow} />
          )} */}
          {isLogin && <LogoutBtn isNarrow={isNarrow} />}
        </NavbarDiv>
      </NavWrapper>
    </>
  )
}

export default Navbar

const NavbarDiv = styled.div`
  position: relative;
  // 내부 패딩
  padding: 24px;

  // 세로 정렬
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // transition
  transition: 0.5s all ease;
  z-index: 5;

  // visibility
  visibility: visible;

  // login Page
  &.login {
    visibility: hidden;
    opacity: 0;
    z-index: 1;
  }
`

const NavWrapper = styled.div`
  position: relative;

  height: 100vh;
  width: 100%;

  transition: opacity 0.1s ease;

  &.isLoading {
    opacity: 0;
  }
`
