import "./ClassNames.css"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { useLocation, Outlet } from "react-router-dom"

// 스타일 적용
import MainSection from "./components/common/Background/MainSection"
import Navbar from "./components/common/Navbar/Navbar"

function App() {
  const curPath = useLocation().pathname

  // 가로 길이 확인 => navbar 형태 전달
  // 현재 화면 크기 state
  const [isNarrow, setIsNarrow] = useState<boolean>(
    window.innerWidth <= 1000 ? true : false
  )

  const handleResize = () => {
    setIsNarrow(window.innerWidth <= 1000 ? true : false)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      // clean up
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <MainWrapper>
        <NavDiv
          className={
            curPath === "/user/login" ||
            curPath === "/user/signup" ||
            curPath === "/oauth/kakao"
              ? "login"
              : isNarrow
              ? "narrow"
              : undefined
          }
        >
          <Navbar isNarrow={isNarrow} />
        </NavDiv>
        <MainDiv
          className={
            curPath === "/user/login" ||
            curPath === "/user/signup" ||
            curPath === "/oauth/kakao"
              ? "login"
              : isNarrow
              ? "narrow"
              : undefined
          }
        >
          <MainSection
            bgColor={
              curPath === "/trade/my" ? "var(--custom-gray-4)" : undefined
            }
          >
            <Outlet />
          </MainSection>
        </MainDiv>
      </MainWrapper>
    </>
  )
}

export default App

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const NavDiv = styled.div`
  // default size
  width: 16.67vw;
  height: 100vh;
  overflow: hidden;

  // transition
  transition: 0.5s all ease;

  // login & signup
  &.login {
    width: 45vw;
  }

  // narrow
  &.narrow {
    width: 100px;
  }
`
const MainDiv = styled.div`
  // default size
  width: 83.33vw;

  // transition
  transition: 0.5s all ease;

  // login & signup
  &.login {
    width: 55vw;
  }

  // narrow
  &.narrow {
    width: calc(100vw - 100px);
  }
`
