import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"
// import { useSetRecoilState } from "recoil"

export const useNickname = () => {
  const axios = customAxios({ isAuthNeeded: true })

  const fetchNickname = () => {
    return axios.get("/member")
  }

  const select = (response: any) => {
    return response.data.data.nickname
  }

  // const setNickname = useSetRecoilState(nicknameState)
  // const onSuccess = (nickname: string) => {
  //   setNickname(nickname)
  // }

  return useQuery(["user", "nickname"], fetchNickname, {
    refetchOnWindowFocus: false,
    select,
    retryDelay: 1000,
    // onSuccess,
    retry: 1,
    // enabled: !!sessionStorage.getItem("accessToken"),
  })
}
