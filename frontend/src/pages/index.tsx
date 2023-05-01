// 페이지 컴포넌트
import MyPage from "./MyPage"
import IndustryDetailPage from "./IndustryDetailPage"
import IndustryMainPage from "./IndustryMainPage"
import StockDetailPage from "./StockDetailPage"
import StockMainPage from "./StockMainPage"

import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  // 마이페이지
  {
    path: "/",
    element: <MyPage />,
  },
  // 주식 종목 페이지
  {
    path: "/stock",
    element: <StockMainPage />,
  },
  {
    path: "/stock/:stockName",
    element: <StockDetailPage />,
  },
  // 산업 별 종목 페이지
  {
    path: "/industry",
    element: <IndustryMainPage />,
  },
  {
    path: "/industry/:industryName",
    element: <IndustryDetailPage />,
  },
])

export default router
