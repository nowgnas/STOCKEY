import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { accessTokenSelector } from "../stores/atoms"

export const useMyAsset = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenSelector)
  const navigate = useNavigate()

  const fetchMyAsset = () => {
    return customAxios(accessToken, setAccessToken, navigate).get(
      `/investment/my/asset`
    )
  }

  return useQuery(["my", "asset"], fetchMyAsset, {
    staleTime: 60 * 60,
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

const select = (response: any) => {
  const rawData = response.data
  const selectedData = rawData
  console.log("selectedData >> ", selectedData)
  return selectedData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
