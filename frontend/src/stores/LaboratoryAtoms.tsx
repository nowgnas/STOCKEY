import { atom } from "recoil"

export interface StockCardType {
  id: number
  name: string
}

export interface KeywordCardType {
  id: number
  name: string
}

// target stock
export const selectedLabStockState = atom<StockCardType | undefined>({
  key: "selectedLabStockState",
  default: undefined,
})

// target keywordList
export const selectedLabKeywordListState = atom<any[]>({
  key: "selectedLabKeywordListState",
  default: [],
})

// drag drop된 card
export const draggedLabCardState = atom<{type: string, item: StockCardType | KeywordCardType | undefined}>({
  key: "draggedLabCardState",
  default: {type: "", item: undefined}
})

// 선택된 period
export const selectedLabPeriodState = atom<number>({
  key: "selectedLabPeriodState",
  default: 1,
})

// stock accordion 상태
export const stockAccordionOpenState = atom<boolean>({
  key: "stockAccordionOpenState",
  default: true,
})

// keyword accordion 상태
export const keywordAccordionOpenState = atom<boolean>({
  key: "keywordAccordionOpenState",
  default: false,
})

// stock search input
export const labStockSearchInput = atom<string>({
  key: "labStockSearchInput",
  default: ""
})

// keyword search input
export const labKeywordSearchInput = atom<string>({
  key: "labKeywordSearchInput",
  default: ""
})

// resultBoard Open state
export const resultBoardOpenState = atom<boolean>({
  key: "resultBoardOpenState",
  default: false
})