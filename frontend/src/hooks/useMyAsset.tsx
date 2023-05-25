import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"
import { useRecoilState } from "recoil"
// import { accessTokenState } from "../stores/atoms"

export const useMyAsset = () => {
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState)

  const fetchMyAsset = () => {
    return customAxios({ isAuthNeeded: true }).get(`/investment/my/asset`)
  }

  return useQuery(["trade", "my", "asset"], fetchMyAsset, {
    staleTime: 60 * 60,
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

const select = (response: any) => {
  const selectedData = response.data.data
  console.log("selectedData >> ", selectedData)
  return selectedData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
