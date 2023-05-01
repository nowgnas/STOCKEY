import customAxios from "../utils/customAxios"
import { useQuery } from "react-query"

const axios = customAxios()

const fetchUserInfo = ({ queryKey }: { queryKey: string[] }) => {
  const code = queryKey[1]

  const params = {
    code: code,
  }

  return axios.get(`/auth/login/kakao/`, { params })
}

export const useUserInfo = (userId: string) => {
  return useQuery(["userInfo", userId], fetchUserInfo, {
    staleTime: 10000,
    select,
    onError,
    refetchOnWindowFocus: false,
    retry: false,
  })
}

const select = (response: any) => {
  return response
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
