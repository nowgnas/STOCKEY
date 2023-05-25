import customAxios from "../utils/customAxios"
import { useQuery } from "react-query"

const axios = customAxios({})

// type
type props = {
  nickname: string | undefined
  oauthId: number
  oauthType: string
}

// fetch nickname & oauthId & oauthType
const fetchSignup = ({
  queryKey,
}: {
  queryKey: (string | number | undefined)[]
}) => {
  const nickname = queryKey[1]
  const oauthId = queryKey[2]
  const oauthType = queryKey[3]

  return axios.put("/auth/nickname", { nickname, oauthId, oauthType })
}

export const useSignup = ({ nickname, oauthId, oauthType }: props) => {
  return useQuery(["Signup", nickname, oauthId, oauthType], fetchSignup, {
    refetchOnWindowFocus: false,
    select,
    onError,
    enabled: false,
    retry: false,
  })
}

const select = (response: any) => {
  return response.data.data.accessToken
}

const onError = (error: any) => {
  console.warn("onError >> ", error)
}
