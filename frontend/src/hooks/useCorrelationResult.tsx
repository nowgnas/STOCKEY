import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"

const axios = customAxios({})

const fetchCorrelationResult = ({ queryKey }: any) => {
  const stockId = queryKey[1]
  const params = {
    keywordId: queryKey[2],
    startDate: queryKey[3],
    endDate: queryKey[4],
  }
  console.log("fetchCorrelationResult")
  return axios.get(`stock/keyword/correlation/${stockId}`, { params })
}

export const useCorrelationResult = (
  stockId: number | undefined,
  keywordId: number,
  startDate: string,
  endDate: string
) => {
  return useQuery(
    ["correlationResult", stockId, keywordId, startDate, endDate],
    fetchCorrelationResult,
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

const select = (response: any) => {
  const rawData: number = response.data.data
  console.log("correlationResult >> ", rawData)
  return rawData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
