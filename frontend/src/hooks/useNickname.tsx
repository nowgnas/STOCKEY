import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"
import { useRecoilState, useSetRecoilState } from "recoil"
import { accessTokenState } from "../stores/atoms"
import { nicknameState } from "../stores/atoms"

export const useNickname = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const axios = customAxios(accessToken, setAccessToken)

  const fetchNickname = () => {
    return axios.get("/member")
  }

  const select = (response: any) => {
    return response.data.data.nickname
  }

  const setNickname = useSetRecoilState(nicknameState)
  const onSuccess = (nickname: string) => {
    setNickname(nickname)
  }

  return useQuery(["user", "nickname"], fetchNickname, {
    refetchOnWindowFocus: false,
    select,
    onSuccess,
    retry: 1,
    enabled: !!accessToken,
  })
}
