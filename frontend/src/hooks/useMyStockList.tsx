import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"

export const useMyStockList = () => {
  const fetchMyStockList = () => {
    return customAxios({ isAuthNeeded: true }).get(`/investment/my/stock`)
  }

  return useQuery(["trade", "my", "stock"], fetchMyStockList, {
    staleTime: 60 * 60,
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

export interface MyStockType {
  stockId: number
  stockName: string
  svp: number // 주식 평가금액 비중 (%)
  rrp: number // 수익률 (%)
  curStockPrice: number // 현재 주가
  avgPrice: number // 평균 매입단가
  count: number // 보유 수량
}

const select = (response: any) => {
  console.log(response)
  const selectedData: MyStockType[] = response.data.data
  console.log("selectedData >> ", selectedData)
  return selectedData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
