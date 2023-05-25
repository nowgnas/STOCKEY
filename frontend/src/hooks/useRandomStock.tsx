import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"

const axios = customAxios({})

const fetchRandomStock = ({ queryKey }: any) => {
  const count = queryKey[1]
  console.log("fetchRandomStock")
  return axios.get(`/stock/random`, { params: { count } })
}

export const useRandomStock = (count: number) => {
  return useQuery(["randomStock", count], fetchRandomStock, {
    staleTime: Infinity,
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

export interface StockType {
  code: string
  id: number
  name: string
  todayDailyStock: {
    changeRate: number
    closePrice: number // 현재가
    highPrice: number
    lowPrice: number
    openPrice: number
    volume: number
    stockDate: string // "2023-03-02"
    id: number // 특정 일자의 주식 가격 정보에 대한 고유 id
  }
}

const select = (response: any) => {
  const rawData = response.data
  const selectedData = rawData.map((stock: StockType) => ({
    id: stock.id,
    name: stock.name,
    changeRate: stock.todayDailyStock.changeRate * 100,
    currentPrice: stock.todayDailyStock.closePrice,
  }))
  console.log("selectedData >> ", selectedData)
  return selectedData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
