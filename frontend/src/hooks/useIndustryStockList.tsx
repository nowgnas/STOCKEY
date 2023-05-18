import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"

const axios = customAxios({})

const fetchIndustryStockList = ({ queryKey }: any) => {
  const industryId = queryKey[1]
  return axios.get(`/industry/stocklist/${industryId}/current`)
}

export const useIndustryStockList = (industryId: number) => {
  return useQuery(["industryStockList", industryId], fetchIndustryStockList, {
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
