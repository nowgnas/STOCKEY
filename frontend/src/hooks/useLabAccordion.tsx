// lab page useQuery 모음

import customAxios from "../utils/customAxios"
import { useQuery } from "react-query"

const axios = customAxios({})

type ParamsType = {
  pathVariable: string | undefined
}

// labPage get 요청
const getLab = async (baseUrl: string, params?: ParamsType | undefined) => {
  let url = baseUrl
  // path variable 있는 경우 추가
  if (params && params.pathVariable) {
    url += `/${params.pathVariable}`
  }
  console.log(url, "get!")
  const response = await axios.get(url)
  console.log(response)
  return response
}

// select
const select = (response: any) => {
  return response.data.data
}

// onError
const onError = (err: any) => {
  console.warn("onError >> ", err)
}

// stock 전체 list get
export const useLabStockEntire = () => {
  return useQuery(["lab", "stock", "entire"], () => getLab("/lab/stock/list"), {
    staleTime: Infinity,
    select,
    onError,
  })
}

// stock 검색 get
export const useLabStockSearch = (searchValue: string | undefined) => {
  const params = { pathVariable: searchValue }

  return useQuery(
    ["lab", "stock", "search", searchValue],
    () => getLab("lab/stock/search", params),
    {
      staleTime: 1000 * 10,
      cacheTime: 1000 * 20,
      select,
      onError,
      // searchValue 있을때만 실행
      enabled: !!searchValue,
    }
  )
}

// keyword 검색 get
// infinite query로 변경 예정
export const useLabKeywordSearch = (searchValue: string | undefined) => {
  const params = { pathVariable: searchValue }

  return useQuery(
    ["lab", "keyword", "search", searchValue],
    () => getLab("lab/keyword/search", params),
    {
      staleTime: 1000 * 10,
      cacheTime: 1000 * 20,
      select,
      onError,
      // searchValue 있을때만 실행
      enabled: !!searchValue,
    }
  )
}
