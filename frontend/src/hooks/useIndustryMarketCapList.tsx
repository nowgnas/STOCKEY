import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"

const axios = customAxios({})

const fetchIndustryMarketCapList = () => {
  return axios.get(`/industry/marketcap`)
}

export const useIndustryMarketCapList = () => {
  return useQuery("industryMarketCapList", fetchIndustryMarketCapList, {
    staleTime: 5 * 60 * 1000,
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

export type DonutChartDataType = {
  id: string
  name: string
  y: number
}[]

const select = (response: any) => {
  const rawData = response.data.data

  let DonutChartData: DonutChartDataType = []

  let OthersData = {
    id: "0",
    name: "기타",
    y: 0,
  }
  for (let i = 0; i < rawData.length; i++) {
    if (i < 7) {
      const newData = {
        id: rawData[i].id,
        name: rawData[i].name,
        y: rawData[i].sum,
      }
      DonutChartData.push(newData)
    } else {
      OthersData.y += rawData[i].sum
    }
  }
  DonutChartData.push(OthersData)

  return DonutChartData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
