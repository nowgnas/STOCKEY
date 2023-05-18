import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"

const axios = customAxios({})

const fetchMarketCapRank = ({ queryKey }: any) => {
  const industryId = queryKey[1]
  if (industryId) {
    return axios.get(`industry/stocklist/${industryId}`)
  } else {
    return axios.get(`/industry/stocklist`)
  }
}

export const useMarketCapRank = (industryId?: string) => {
  return useQuery(["marketCapRank", industryId], fetchMarketCapRank, {
    staleTime: 5 * 60 * 1000,
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

const select = (response: any) => {
  return response.data.data
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
