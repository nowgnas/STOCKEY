import { useMutation, useQuery } from "react-query"
import customAxios from "../utils/customAxios"
import dayjs from "dayjs"
import { useRecoilState } from "recoil"
import { accessTokenSelector } from "../stores/atoms"
import { useNavigate } from "react-router-dom"

export interface SubmitProps {
  stockId: number
  count: number
  orderType: String
}
const axios = customAxios()

const fetchSubmitTrade = (myList: SubmitProps[]) => {
  return axios.post("/api/investment/order", myList)
}
// Form 제출
export const useSubmitTradeMutation = () => {
  return useMutation(fetchSubmitTrade)
}

// 주문 여부 확인
export const useCheckOrder = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenSelector)
  const navigate = useNavigate()

  const currentTime = dayjs()
  const nextTradeTime = dayjs().add(1, "hour").minute(2).startOf("minute")
  const timeLeft = dayjs
    .duration(nextTradeTime.diff(currentTime))
    .asMilliseconds()

  const fetchCheckOrder = ({ queryKey }: any) => {
    return customAxios(accessToken, setAccessToken, navigate).get(
      "/api/investment/order/check"
    )
  }

  return useQuery(["checkOrder", "orderStatus"], fetchCheckOrder, {
    staleTime: timeLeft,
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

// 현재 잔액 조회
export const useMyBalance = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenSelector)
  const navigate = useNavigate()

  const currentTime = dayjs()
  const nextTradeTime = dayjs().add(1, "hour").minute(2).startOf("minute")
  const timeLeft = dayjs
    .duration(nextTradeTime.diff(currentTime))
    .asMilliseconds()

  const fetchMyBalance = () => {
    return customAxios(accessToken, setAccessToken, navigate).get(
      "/api/investment/my/asset"
    )
  }

  return useQuery(["myBalance"], fetchMyBalance, {
    staleTime: timeLeft,
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

export const useOrderSituation = (stockId: number, status: string) => {
  const fetchOrderSituation = () => {
    return axios.get(`/api/investment/usersorder/${stockId}`)
  }

  return useQuery(["orderSituation", status, stockId], fetchOrderSituation, {
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

const select = (response: any) => {
  return response.data.data
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
