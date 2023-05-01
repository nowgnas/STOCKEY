import "./App.css"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"

// 페이지 컴포넌트
import MyPage from "./pages/MyPage"
import IndustryDetailPage from "./pages/IndustryDetailPage"
import IndustryMainPage from "./pages/IndustryMainPage"
import StockDetailPage from "./pages/StockDetailPage"
import StockMainPage from "./pages/StockMainPage"
import KeywordPage from "./pages/KeywordPage"
import KeywordDetailPage from "./pages/KeywordDetailPage"
import Login from "./pages/Login"
import SignupPage from "./pages/SignupPage"
import LoginRedirectHandler from "./components/common/Login/LoginRedirectHandler"
import StockeyErrorPage from "./pages/StockeyErrorPage"

// 스타일 적용
import MainSection from "./components/common/Background/MainSection"
import Navbar from "./components/common/Navbar/Navbar"
import NotFoundPage from "./pages/NotFoundPage"

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
          <MainSection>
            <Routes>
              <Route path="/" element={<Navigate to="/stock" />} />
              <Route path="/stock" element={<StockMainPage />} />
              <Route path="/stock/:stockId" element={<StockDetailPage />} />
              <Route path="/my" element={<MyPage />} />
              <Route path="/industry" element={<IndustryMainPage />} />
              <Route
                path="/industry/:industryName"
                element={<IndustryDetailPage />}
              />
              <Route path="/keyword" element={<KeywordPage />} />
              <Route
                path="/keyword/:keywordName"
                element={<KeywordDetailPage />}
              />
              <Route path="/user/login" element={<Login />} />
              <Route path="/oauth/kakao" element={<LoginRedirectHandler />} />
              <Route path="/user/signup" element={<SignupPage />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
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
