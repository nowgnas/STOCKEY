import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"

const axios = customAxios({})

export interface KeywordRankParamsType {
  topN: number
  newsType: "STOCK" | "INDUSTRY" | "ECONOMY"
  typeId: number
  // yymmdd
  startDate: string
  endDate: string
}

const fetchKeywordRank = ({ queryKey }: any) => {
  const [, topN, newsType, id, startDate, endDate] = queryKey
  console.log("fetchKeywordRank")
  return axios.get(`/keywords/topN`, {
    params: { topN, newsType, id, startDate, endDate },
  })
}

export const useKeywordRank = ({
  topN,
  newsType,
  typeId,
  startDate,
  endDate,
}: KeywordRankParamsType) => {
  return useQuery(
    ["keywordRank", topN, newsType, typeId, startDate, endDate],
    fetchKeywordRank,
    {
      staleTime: 60 * 60, // 1시간 동안만 fresh
      cacheTime: Infinity,
      select,
      onError,
      refetchOnWindowFocus: false,
      enabled: !!typeId,
    }
  )
}

interface KeywordType {
  keywordName: string
  keywordCount: number
  keywordId: number
}

export interface ChartDataType extends Highcharts.PointOptionsObject {
  name: string
  y: number
  rank: number
  keywordId: number
}

const select = (response: any) => {
  const rawData = response.data.data
  const { totalNewsCount, topKeywordDTO: topKeywords } = rawData
  const chartData: ChartDataType[] = topKeywords.map(
    (keyword: KeywordType, index: number) => {
      return {
        name: keyword.keywordName,
        y: (keyword.keywordCount / totalNewsCount) * 100,
        rank: index + 1,
        keywordId: keyword.keywordId,
      }
    }
  )
  const top2 = chartData.splice(1, 1)
  console.log("top", top2[0])
  chartData.splice(0, 0, top2[0])

  const top3 = chartData.slice(0, 3)
  const others = chartData.slice(3)
  return { top3, others, totalNewsCount }
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
