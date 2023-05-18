import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"
import { useRecoilState } from "recoil"
// import { accessTokenState } from "../stores/atoms"
import dayjs from "dayjs"

export const useMyTradeHistory = () => {
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState)

  const fetchMyTradeHistory = () => {
    return customAxios({ isAuthNeeded: true }).get(`/investment/my/orders`)
  }

  return useQuery(["trade", "my", "order"], fetchMyTradeHistory, {
    staleTime: 60 * 60,
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

export interface TradeHistoryType {
  stockId: number
  stockName: string
  orderCount: number // 주문 수량
  contractCount: number // 거래 체결 수량
  contractPrice: number // 거래 체결 금액
  profit: number // 실현 손익
  contractType: "BUY" | "SELL" // 거래 유형
  createdAt: string // 주문 시각
}

const select = (response: any) => {
  console.log(response)
  const selectedData: TradeHistoryType[] = response.data.data
  const billData: { [key: string]: any[] } = {}

  selectedData.forEach((data) => {
    if (billData.hasOwnProperty(dayjs(data.createdAt).format("M월 D일 H시"))) {
      billData[dayjs(data.createdAt).format("M월 D일 H시")].push(data)
    } else {
      billData[dayjs(data.createdAt).format("M월 D일 H시")] = [data]
    }
  })

  console.log("billData >> ", billData)
  return billData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
