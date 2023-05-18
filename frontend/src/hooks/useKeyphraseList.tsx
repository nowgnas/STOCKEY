import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"

const axios = customAxios({})

export interface KeyphraseListParamsType {
  keywordId: number | undefined
  newsType: "STOCK" | "INDUSTRY" | "ECONOMY"
  typeId: number
  // yymmdd
  startDate: string
  endDate: string
}

const fetchKeyphraseList = ({ queryKey }: any) => {
  const [, keywordId, newsType, id, startDate, endDate] = queryKey
  console.log("fetchKeyPhraseList")
  return axios.get(`/keywords/${keywordId}/keyphrase`, {
    params: { newsType, id, startDate, endDate },
  })
}

export const useKeyphraseList = ({
  keywordId,
  newsType,
  typeId,
  startDate,
  endDate,
}: KeyphraseListParamsType) => {
  return useQuery(
    ["keyPhraseList", keywordId, newsType, typeId, startDate, endDate],
    fetchKeyphraseList,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      select,
      onError,
      refetchOnWindowFocus: false,
      enabled: !!keywordId,
      suspense: true,
    }
  )
}

interface KeyphraseType {
  key_phrase: string
  news: {
    title: string
    url: string
    date: string // yyyy-mm-dd
  }[]
}
const select = (response: any) => {
  const rawData: KeyphraseType[] = response.data.data
  // const keyphraseData = rawData.map((keyphrase: KeyphraseType) => {
  //   return { keyphrase: keyphrase["key_phrase"], news: keyphrase["news"] }
  // })
  // console.log("selectedData >> ", keyphraseData)
  return rawData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
