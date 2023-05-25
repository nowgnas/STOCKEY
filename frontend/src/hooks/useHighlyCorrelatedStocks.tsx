import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"

const axios = customAxios({})

const fetchHighlyCorrStocks = ({ queryKey }: any) => {
  const stockId = queryKey[1]
  const params = {
    keywordId: queryKey[2],
    startDate: queryKey[3],
    endDate: queryKey[4],
  }
  console.log("fetchHighlyCorrStocks")
  return axios.get(`stock/keyword/correlation/${stockId}/high`, { params })
}

export const useHighlyCorrStocks = (
  stockId: number | undefined,
  keywordId: number,
  startDate: string,
  endDate: string
) => {
  return useQuery(
    ["highlyCorrStocks", stockId, keywordId, startDate, endDate],
    fetchHighlyCorrStocks,
    {
      staleTime: 60 * 60, // 1시간 동안만 fresh
      cacheTime: Infinity,
      select,
      onError,
      refetchOnWindowFocus: false,
      enabled: stockId !== 0 && stockId !== undefined && keywordId !== 0,
    }
  )
}
interface CorrDataType {
  id: number
  name: string
  correlation: number
}
const select = (response: any) => {
  const rawData: CorrDataType[] = response.data.data
  console.log("HighlyCorrStocks >> ", rawData)
  return rawData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
