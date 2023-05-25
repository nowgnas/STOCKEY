import { useQuery } from "react-query"
import customAxios from "../utils/customAxios"
import { useRecoilState } from "recoil"
// import { accessTokenState } from "../stores/atoms"

export const useTraderRank = (nickname: string = "") => {
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState)

  const fetchTraderRank = ({ queryKey }: any) => {
    const nickname = queryKey[2]
    console.log("nickname >> ", nickname)

    return customAxios({ isAuthNeeded: true }).get(`/investment/rank`, {
      params: { num: 20, nickname: nickname },
    })
  }

  return useQuery(["trade", "rank", nickname], fetchTraderRank, {
    staleTime: 60 * 60,
    select,
    onError,
    refetchOnWindowFocus: false,
  })
}

// 응답 데이터 타입
interface TraderRankType {
  nickName: string
  totalAsset: number
  ranking: number
}

interface RankDataType {
  traderRankList: TraderRankType[] | []
  myRank: number
}

const select = (response: any) => {
  console.log(response)
  const selectedData: RankDataType = response.data.data
  console.log("selectedData >> ", selectedData)
  return selectedData
}

const onError = (err: any) => {
  console.warn("onError >> ", err)
}
