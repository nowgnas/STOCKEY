import { atom } from "recoil"

export interface StockCardType {
  id: number
  name: string
}

export interface KeywordCardType {
  id: number
  name: string
}

export const selectedLabStockState = atom<StockCardType | undefined>({
  key: "selectedLabStockState",
  default: undefined,
})

export const selectedLabKeywordListState = atom<any[]>({
  key: "selectedLabKeywordListState",
  default: [],
})

export const draggedLabCardState = atom<{type: string, item: StockCardType | KeywordCardType | undefined}>({
  key: "draggedLabCardState",
  default: {type: "", item: undefined}
})

export const selectedLabPeriodState = atom<number>({
  key: "selectedLabPeriodState",
  default: 1,
})