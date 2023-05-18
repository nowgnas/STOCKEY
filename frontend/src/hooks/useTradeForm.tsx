import { useMutation, useQuery } from "react-query"
import customAxios from "../utils/customAxios"
import dayjs from "dayjs"
import { useRecoilState } from "recoil"
// import { accessTokenState } from "../stores/atoms"
import { useNavigate } from "react-router-dom"
import axios from "axios"
export interface SubmitProps {
  stockId: number
  count: number
  orderType: String
}
// const axios = customAxios({})

// const fetchSubmitTrade = (myList: SubmitProps[]) => {
//   return axios.post("/api/investment/order", myList)
// }

const timeLeft = () => {
  const currentTime = dayjs()
  const nextTradeTime = dayjs().add(1, "hour").minute(2).startOf("minute")
  return dayjs.duration(nextTradeTime.diff(currentTime)).asMilliseconds()
}

const fetchSubmitTrade = (myList: SubmitProps[]) => {
  const testAxios = axios.post(
    `${process.env.REACT_APP_SERVER_BASE_URL}/investment/order`,
    {
      headers: { "X-UserId": 1 },
      data: myList,
    }
  )
  return testAxios
}
// Form 제출
export const useSubmitTradeMutation = () => {
  return useMutation(fetchSubmitTrade)
}

// 주문 여부 확인
export const useCheckOrder = () => {
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const navigate = useNavigate()

  const fetchCheckOrder = () => {
    const testAxios = axios.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/investment/order/check`,
      {
        headers: { "X-UserId": 1 },
      }
    )
    return testAxios
  }
  // const fetchCheckOrder = ({ queryKey }: any) => {
  //   return customAxios({isAuthNeeded: true, navigate: navigate}).get(
  //     "/api/investment/order/check"
  //   )
  // }

  return useQuery(["checkOrder"], fetchCheckOrder, {
    staleTime: timeLeft(),
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

// 현재 잔액 조회
export const useMyBalance = () => {
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const navigate = useNavigate()

  const fetchMyBalance = () => {
    const testAxios = axios.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/investment/my/asset`,
      {
        headers: { "X-UserId": 1 },
      }
    )
    return testAxios
  }
  // const fetchMyBalance = () => {
  //   return customAxios({isAuthNeeded: true, navigate: navigate}).get(
  //     "/api/investment/my/asset"
  //   )
  // }

  return useQuery(["myBalance"], fetchMyBalance, {
    staleTime: timeLeft(),
    select,
    onError,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  })
}

// 각 종목당 주문 현황 api
export const useOrderStatus = (stockId: number) => {
  const fetchOrderStatus = () => {
    const testAxios = axios.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/investment/orderstatus/${stockId}`
    )
    return testAxios
  }

  // const fetchOrderStatus = () => {
  //   return axios.get(`/api/investment/orderstatus/${stockId}`)
  // }

  return useQuery(["orderStatus", stockId], fetchOrderStatus, {
    cacheTime: 0,
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

// 내 보유 주식 api
export const useMyStocks = () => {
  const fetchMyStocks = () => {
    const testAxios = axios.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/investment/my/stock`,
      {
        headers: { "X-UserId": 1 },
      }
    )
    return testAxios
  }

  // const fetchMyStocks = () => {
  //   return customAxios({isAuthNeeded: true, navigate: navigate}).get(
  //     "/api/investment/my/stock"
  //   )
  // }
  return useQuery(["myStock"], fetchMyStocks, {
    staleTime: timeLeft(),
    select: myStockSelect,
    onError,
    refetchOnWindowFocus: false,
  })
}

// 전체 주식 종목 가져오기
export const useWholeStocks = () => {
  const fetchWholeStocks = () => {
    const testAxios = axios.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/investment/wholestockinfo`
    )
    return testAxios
  }

  // const fetchWholeStocks = () => {
  //   return axios.get(`/api/investment/wholestockinfo`)
  // }

  return useQuery(["wholeStock"], fetchWholeStocks, {
    staleTime: timeLeft(),
    select: wholeStockSelect,
    onError,
    refetchOnWindowFocus: false,
  })
}

const select = (response: any) => {
  return response.data.data
}

const myStockSelect = (response: any) => {
  const responseData = response.data.data
  const formatData = responseData.map(
    (item: {
      stockId: number
      stockName: string
      curStockPrice: number
      avgPrice: number
      count: number
      svp: number
      rrp: number
    }) => {
      return {
        id: item.stockId,
        name: item.stockName,
        currentPrice: item.curStockPrice,
        buyPrice: item.avgPrice,
        stockNums: item.count,
      }
    }
  )
  return formatData
}

const wholeStockSelect = (response: any) => {
  const responseData = response.data.data
  const formatData = responseData.map(
    (item: { stockId: number; stockName: string; stockPrice: number }) => {
      return {
        id: item.stockId,
        name: item.stockName,
        currentPrice: item.stockPrice,
      }
    }
  )
  return formatData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
