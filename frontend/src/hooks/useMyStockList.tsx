import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { accessTokenState } from "../stores/atoms"
import axios from "axios"

export const useMyStockList = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const navigate = useNavigate()

  const fetchMyStockList = () => {
    const testAxios = axios.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/investment/my/stock`,
      {
        headers: { "X-UserId": 1 },
      }
    )
    return testAxios
    // return customAxios(accessToken, setAccessToken, navigate).get(
    //   `/investment/my/stock`
    // )
  }

  return useQuery(["my", "stock"], fetchMyStockList, {
    staleTime: 60 * 60,
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

const select = (response: any) => {
  console.log(response)
  const selectedData = response.data
  console.log("selectedData >> ", selectedData)
  return selectedData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
