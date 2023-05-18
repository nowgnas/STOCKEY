import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"

const axios = customAxios({})

const fetchKeywordFrequency = ({ queryKey }: any) => {
  const keywordId = queryKey[1]
  console.log("fetchKeywordFrequency")
  return axios.get(`/keywords/${keywordId}/frequency`)
}

export const useKeywordFrequency = (keywordId: number) => {
  return useQuery(["keywordFrequency", keywordId], fetchKeywordFrequency, {
    staleTime: 60 * 60, // 1시간 동안만 fresh
    cacheTime: Infinity,
    select,
    onError,
    refetchOnWindowFocus: false,
    suspense: true,
  })
}

interface KeywordFrequencyType {
  count: number
  statisticDate: string // yyyy-mm-dd
}

const select = (response: any) => {
  const rawData = response.data.data
  const keywordFrequencyChartData = rawData.map(
    (item: KeywordFrequencyType) => {
      const dateObj = new Date(item.statisticDate)
      const newItem = [dateObj.getTime(), item.count]
      return newItem
    }
  )
  console.log("키워드 빈도수 데이터 >> ", keywordFrequencyChartData)
  return keywordFrequencyChartData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
