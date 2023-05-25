import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"

const axios = customAxios({})

const fetchStockDetail = ({ queryKey }: any) => {
  const stockId = queryKey[1]
  console.log("fetchStockDetail")
  return axios.get(`/stock/${stockId}`)
}

export const useStockDetail = (stockId: number) => {
  return useQuery(["stockDetail", stockId], fetchStockDetail, {
    staleTime: Infinity,
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

export interface StockDetailType {
  id: number
  name: string
  code: number
  description: string | null
  marketCap: number // 시가총액
  stockCount: number
  companySize: string
  companySales: string // 74조7,216억
  creditRank: string // 최상 (2023.02)
  basicInfo: string // 상위12%
  industry: {
    id: number
    name: string
    description: string | null
    category: string
  }
  businesses: {
    id: number
    name: string
    description: string | null
  }[]
  todayDailyStock: {
    id: number
    stockDate: string // 2023-04-04
    openPrice: number
    closePrice: number
    lowPrice: number
    highPrice: number
    volume: number
    changeRate: number
  }
  industryTotalCount: number // 소속 산업 내 종목 수
  industryCapRank: number // 소속 산업 내 시총 순위
  industryFavRank: number // 소속 산업 내 관심 순위
  industryAvgChangeRate: number // 소속 산업 평균 등락률
}

const select = (response: any) => {
  const rawData: StockDetailType = response.data
  console.log("stockDetailData >> ", rawData)
  return rawData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
