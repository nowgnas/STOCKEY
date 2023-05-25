import customAxios from "../utils/customAxios"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"

const axios = customAxios({})

const fetchUserInfo = ({ queryKey }: { queryKey: string[] }) => {
  const code = queryKey[1]

  const params = {
    code: code,
  }

  return axios.get(`/auth/login/kakao/`, { params })
}

export const useUserInfo = (userId: string) => {
  const navigate = useNavigate()
  return useQuery(["user", userId], fetchUserInfo, {
    staleTime: 10000,
    select,
    onSuccess: (response: any) => {
      if (response.status === 201) return
      if (response.status === 200) {
        sessionStorage.setItem("accessToken", response.data.data.accessToken)
        navigate("/stock", { replace: true })
      }
    },
    onError: (err) => {
      console.warn("onError >> ", err)
      window.alert("로그인 오류 발생")
      navigate("/user/login", { replace: true })
    },
    refetchOnWindowFocus: false,
    retry: false,
  })
}

const select = (response: any) => {
  console.log("useUserInfo야", response)
  return response
}
