import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"
import dayjs from "dayjs"

export const useMyTradeHistory = () => {
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
  const billData: { [key: string]: { BUY: any[]; SELL: any[] } } = {}

  selectedData.forEach((data) => {
    const tradeTime = dayjs(data.createdAt).format("M월 D일 H시")
    if (!billData.hasOwnProperty(tradeTime)) {
      billData[tradeTime] = { BUY: [], SELL: [] }
    }
    billData[tradeTime][data.contractType].push({
      id: data.stockId,
      name: data.stockName,
      orderQuantity: data.orderCount,
      contractQuantity: data.contractCount,
      contractPrice: data.contractPrice,
      profit: data.profit,
    })
  })

  console.log("billData >> ", billData)
  return billData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
