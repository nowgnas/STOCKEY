// 페이지 컴포넌트
import MyPage from "./MyPage"
import IndustryDetailPage from "./IndustryDetailPage"
import IndustryMainPage from "./IndustryMainPage"
import StockDetailPage from "./StockDetailPage"
import StockMainPage from "./StockMainPage"
import KeywordPage from "./KeywordPage"
import KeywordDetailPage from "./KeywordDetailPage"
import LabPage from "./LabPage"
import TradeMyPage from "./TradeMyPage"
import Login from "./Login"
import LoginRedirectHandler from "../components/common/Login/LoginRedirectHandler"
import SignupPage from "./SignupPage"
import NotFoundPage from "./NotFoundPage"
import App from "../App"

import { createBrowserRouter } from "react-router-dom"
import TradeMainPage from "./TradeMainPage"
import TradeOrderPage from "./TradeOrderPage"
import TradeRankingPage from "./TradeRankingPage"

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      // 주식 종목 페이지
      {
        path: "/",
        element: <StockMainPage />,
      },
      {
        path: "/stock",
        element: <StockMainPage />,
      },
      {
        path: "/stock/:stockId",
        element: <StockDetailPage />,
      },
      // 마이페이지
      {
        path: "/my",
        element: <MyPage />,
      },
      // 산업 페이지
      {
        path: "/industry",
        element: <IndustryMainPage />,
      },
      {
        path: "/industry/:industryName",
        element: <IndustryDetailPage />,
      },
      // 키워드 페이지
      {
        path: "/keyword",
        element: <KeywordPage />,
      },
      {
        path: "/keyword/:keywordName",
        element: <KeywordDetailPage />,
      },
      // 모의투자 페이지
      {
        path: "/trade",
        children: [
          { index: true, element: <TradeMainPage /> },
          {
            path: "order",
            element: <TradeOrderPage />,
          },
          {
            path: "ranking",
            element: <TradeRankingPage />,
          },
          {
            path: "my",
            element: <TradeMyPage />,
          },
        ],
      },
      // 실험실 페이지
      {
        path: "/lab",
        element: <LabPage />,
      },

      // 로그인 페이지
      {
        path: "/user/login",
        element: <Login />,
      },
      {
        path: "/oauth/kakao",
        element: <LoginRedirectHandler />,
      },
      // 회원가입 페이지
      {
        path: "/user/signup",
        element: <SignupPage />,
      },
      // 404 페이지
      {
        path: "/*",
        element: <NotFoundPage />,
      },
    ],
  },
])

export default router
