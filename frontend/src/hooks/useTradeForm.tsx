import { useMutation, useQuery } from "react-query"
import customAxios from "../utils/customAxios"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"

export interface SubmitProps {
  stockId: number
  count: number
  orderType: String
}

const timeLeft = () => {
  const currentTime = dayjs()
  const nextTradeTime = dayjs().add(1, "minute").startOf("minute")
  return dayjs.duration(nextTradeTime.diff(currentTime)).asMilliseconds()
}

// Form 제출
export const useSubmitTradeMutation = () => {
  const navigate = useNavigate()

  const fetchSubmitTrade = (myList: SubmitProps[]) => {
    return customAxios({ isAuthNeeded: true, navigate }).post(
      "/investment/order",
      myList
    )
  }

  return useMutation(fetchSubmitTrade)
}

// 주문 여부 확인
export const useCheckOrder = () => {
  const navigate = useNavigate()

  const fetchCheckOrder = ({ queryKey }: any) => {
    return customAxios({ isAuthNeeded: true, navigate }).get(
      "/investment/order/check"
    )
  }

  return useQuery(["oneMinute", "checkOrder"], fetchCheckOrder, {
    staleTime: timeLeft(),
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

// 현재 잔액 조회
export const useMyBalance = () => {
  const navigate = useNavigate()

  const fetchMyBalance = () => {
    return customAxios({ isAuthNeeded: true, navigate }).get(
      "/investment/my/asset"
    )
  }

  return useQuery(["oneMinute", "myBalance"], fetchMyBalance, {
    staleTime: timeLeft(),
    select,
    onError,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  })
}

// 각 종목당 주문 현황 api
export const useOrderStatus = (stockId: number, isHover: boolean) => {
  const fetchOrderStatus = () => {
    return customAxios({}).get(`/investment/orderstatus/${stockId}`)
  }

  return useQuery(["oneMinute", "orderStatus", stockId], fetchOrderStatus, {
    staleTime: 1000 * 60,
    select,
    onError,
    refetchOnWindowFocus: false,
    enabled: isHover,
  })
}

// 내 보유 주식 api
export const useMyStocks = () => {
  const navigate = useNavigate()

  const fetchMyStocks = () => {
    return customAxios({ isAuthNeeded: true, navigate }).get(
      "/investment/my/stock"
    )
  }

  return useQuery(["oneMinute", "myStock"], fetchMyStocks, {
    staleTime: timeLeft(),
    select: myStockSelect,
    onError,
    refetchOnWindowFocus: false,
  })
}

// 전체 주식 종목 가져오기
export const useWholeStocks = () => {
  const fetchWholeStocks = () => {
    return customAxios({}).get(`/investment/wholestockinfo`)
  }
  console.log("here")
  return useQuery(["wholeStock"], fetchWholeStocks, {
    staleTime: timeLeft(),
    select: wholeStockSelect,
    onError,
    refetchOnWindowFocus: false,
  })
}

export const usePopList = () => {
  const fetchPopList = () => {
    return customAxios({}).get(`/investment/popular/15`)
  }

  return useQuery(["oneMinute", "usePopList"], fetchPopList, {
    staleTime: timeLeft(),
    select,
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
