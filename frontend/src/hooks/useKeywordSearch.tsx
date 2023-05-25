import customAxios from "../utils/customAxios"
import { useQuery } from "react-query"

const axios = customAxios({})

interface Props {
  id: number
  name: string
}

// fetch search value
const fetchKeywordSearch = ({
  queryKey,
}: {
  queryKey: (string | undefined)[]
}) => {
  const page = queryKey[2]
  const params = { keyword: queryKey[1] }
  if (page === "keyword") {
    return axios.get("/keywords/search/", {
      params,
    })
  } else {
    return axios.get("/stock/search/", {
      params,
    })
  }
}

export const useKeywordSearch = (
  searchValue: string | undefined,
  page: string
) => {
  return useQuery(["searchKeyword", searchValue, page], fetchKeywordSearch, {
    refetchOnWindowFocus: false,
    enabled: false,
    retry: false,
    select,
  })
}

const select = (response: any) => {
  return response.data.data
}
