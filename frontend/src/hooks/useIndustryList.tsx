import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"

const axios = customAxios({})

const fetchIndustryList = ({ queryKey }: any) => {
  if (queryKey[1]) {
    const industryId = queryKey[1]
    return axios.get(`/industry/${industryId}`)
  } else {
    return axios.get(`/industry`)
  }
}

export const useIndustryList = (industryId?: number) => {
  return useQuery(["industryList", industryId], fetchIndustryList, {
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
  // console.warn("onError >> ", err)
  return err
}
