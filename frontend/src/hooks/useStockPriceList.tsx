import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"

const axios = customAxios({})

const fetchStockPriceList = ({ queryKey }: any) => {
  const stockId = queryKey[1]
  return axios.get(`/stock/${stockId}/dailystock`)
}

export const useStockPriceList = (stockId: number) => {
  return useQuery(["stockPriceList", stockId], fetchStockPriceList, {
    staleTime: 5 * 60 * 1000,
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

export type StockPriceChartDataType = number[][]
type RawDataType = {
  id: number
  stockDate: string
  openPrice: number
  closePrice: number
  lowPrice: number
  highPrice: number
  volume: number
  changeRate: number
}

const select = (response: any) => {
  const rawData = response.data
  console.log(response)

  const stockPriceChartData: StockPriceChartDataType = rawData.map(
    (item: RawDataType) => {
      const dateObj = new Date(item.stockDate)
      const newItem = [
        dateObj.getTime(),
        item.openPrice,
        item.highPrice,
        item.lowPrice,
        item.closePrice,
      ]
      return newItem
    }
  )

  return stockPriceChartData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}

const stockNames = [
  "SK이노베이션",
  "S-Oil",
  "HD현대",
  "씨에스윈드",
  "LG화학",
  "POSCO홀딩스",
  "포스코케미칼",
  "고려아연",
  "한화솔루션",
  "현대제철",
  "금호석유",
  "SKC",
  "코스모신소재",
  "삼성물산",
  "두산에너빌리티",
  "삼성엔지니어링",
  "한국조선해양",
  "한화에어로스페이스",
  "한국항공우주",
  "삼성중공업",
  "현대건설",
  "두산밥캣",
  "포스코인터내셔널",
  "현대중공업",
  "HMM",
  "대한항공",
  "맥쿼리인프라",
  "현대글로비스",
  "한진칼",
  "팬오션",
  "현대차",
  "기아",
  "현대모비스",
  "한국타이어앤테크놀로지",
  "한온시스템",
  "LG생활건강",
  "아모레퍼시픽",
  "코웨이",
  "F&F",
  "아모레G",
  "강원랜드",
  "이마트",
  "BGF리테일",
  "KT&G",
  "오리온",
  "CJ제일제당",
  "롯데지주",
  "셀트리온",
  "삼성바이오로직스",
  "유한양행",
  "한미약품",
  "SK바이오사이언스",
  "SK바이오팜",
  "KB금융",
  "신한지주",
  "하나금융지주",
  "우리금융지주",
  "카카오뱅크",
  "기업은행",
  "한국금융지주",
  "미래에셋증권",
  "메리츠금융지주",
  "메리츠증권",
  "삼성카드",
  "삼성화재",
  "삼성생명",
  "DB손해보험",
  "현대해상",
  "삼성에스디에스",
  "카카오페이",
  "현대오토에버",
  "삼성전기",
  "LG이노텍",
  "삼성전자",
  "SK하이닉스",
  "SK스퀘어",
  "삼성SDI",
  "LG에너지솔루션",
  "LG전자",
  "SK아이이테크놀로지",
  "LG디스플레이",
  "SK텔레콤",
  "LG유플러스",
  "NAVER",
  "카카오",
  "엔씨소프트",
  "크래프톤",
  "하이브",
  "넷마블",
  "한국전력",
]
