import { atom, selector } from "recoil"
import dayjs from "dayjs"
import { KeywordRankParamsType } from "../hooks/useKeywordRank"
import { KeyphraseListParamsType } from "../hooks/useKeyphraseList"

// stock-main 페이지에서 사용하는 state들을 관리하는 파일입니다.

// 선택된 stock의 index를 저장하는 state
export const selectedStockState = atom<{
  idx: number
  id: number
  name: string
}>({
  key: "selectedStockState",
  default: {
    idx: 0,
    id: 0,
    name: "",
  },
})

// 선택된 keyword의 index를 저장하는 state
export const selectedKeywordState = atom<{
  idx: number
  id: number | undefined
}>({
  key: "selectedKeywordState",
  default: {
    idx: 1,
    id: 0,
  },
})

export const keywordParamsState = selector<KeywordRankParamsType>({
  key: "keywordParamsState",
  get: ({ get }) => {
    return {
      topN: 6,
      typeId: get(selectedStockState).id,
      newsType: "STOCK",
      startDate: dayjs().subtract(1, "year").startOf("year").format("YYMMDD"),
      endDate: dayjs().format("YYMMDD"),
    }
  },
})
export const keyphraseParamsState = selector<KeyphraseListParamsType>({
  key: "keyphraseParamsState",
  get: ({ get }) => {
    return {
      newsType: "STOCK",
      typeId: get(selectedStockState).id,
      keywordId: get(selectedKeywordState).id,
      startDate: dayjs().subtract(1, "year").startOf("year").format("YYMMDD"),
      endDate: dayjs().format("YYMMDD"),
    }
  },
})
