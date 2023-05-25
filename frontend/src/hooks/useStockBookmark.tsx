import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"

const axios = customAxios({})

const fetchStockBookmark = ({ queryKey }: any) => {
  const stockId = queryKey[1]
  console.log("fetchStockBookmark")
  return axios.get(`/stock/my/${stockId}`)
}

export const useStockBookmark = (stockId: number) => {
  return useQuery(["stockBookmark", stockId], fetchStockBookmark, {
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

const select = (response: any) => {
  const rawData = response.data
  const isBookmarked: boolean = rawData.data
  console.log("selectedData >> ", isBookmarked)
  return isBookmarked
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
