import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"

const axios = customAxios({})

const fetchIndustryMarketCap = ({ queryKey }: any) => {
  const industryId = queryKey[1]
  return axios.get(`/industry/marketcap/${industryId}`)
}

export const useIndustryMarketCap = (industryId: number) => {
  return useQuery(["industryMarketCap", industryId], fetchIndustryMarketCap, {
    staleTime: 5 * 60 * 1000,
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

export type LineChartDataType = [number, number][]
type RawDataType = {
  stockDate: string
  marketCap: number
  epochTime: number
}[]

const select = (response: any) => {
  const rawData: RawDataType = response.data.data

  const lineChartData: LineChartDataType = rawData.map((item) => {
    const dateObj = new Date(item.stockDate)
    const newItem: [number, number] = [dateObj.getTime(), item.marketCap]
    return newItem
  })

  return lineChartData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
