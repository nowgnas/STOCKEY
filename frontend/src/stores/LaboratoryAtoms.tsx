import { atom, selector } from "recoil";

export interface StockCardType {
  id: number;
  name: string;
}

export interface KeywordCardType {
  id: number;
  name: string;
}

// target stock
export const selectedLabStockState = atom<StockCardType | undefined>({
  key: "selectedLabStockState",
  default: undefined,
});

// target keywordList
export const selectedLabKeywordListState = atom<any[]>({
  key: "selectedLabKeywordListState",
  default: [],
});

// drag drop된 card
export const draggedLabCardState = atom<{
  type: string;
  item: StockCardType | KeywordCardType | undefined;
}>({
  key: "draggedLabCardState",
  default: { type: "", item: undefined },
});

// 선택된 period
export const selectedLabPeriodState = atom<number>({
  key: "selectedLabPeriodState",
  default: 1,
});

// stock accordion 상태
export const stockAccordionOpenState = atom<boolean>({
  key: "stockAccordionOpenState",
  default: true,
});

// keyword accordion 상태
export const keywordAccordionOpenState = atom<boolean>({
  key: "keywordAccordionOpenState",
  default: false,
});

// stock search input
export const labStockSearchInput = atom<string>({
  key: "labStockSearchInput",
  default: "",
});

// keyword search input
export const labKeywordSearchInput = atom<string>({
  key: "labKeywordSearchInput",
  default: "",
});

// resultBoard Size
type resultBoardSizeType = "big" | "small";
export const resultBoardSizeState = selector<resultBoardSizeType>({
  key: "resultBoardSizeState",
  // resultBoard의 size를 get
  get: ({ get }) => {
    const stockAccordionOpen = get(stockAccordionOpenState);
    const keywordAccordionOpen = get(keywordAccordionOpenState);
    if (stockAccordionOpen || keywordAccordionOpen) {
      return "small";
    } else {
      return "big";
    }
  },
  // resultBoard size를 big으로 변경하기 위해 accordion false로 set
  set: ({ set }, newVal) => {
    console.log('set!')
    if (newVal === "big") {
      set(stockAccordionOpenState, false);
      set(keywordAccordionOpenState, false);
    }
  },
});

// resultBoard Open state
export const resultBoardOpenState = atom<boolean>({
  key: "resultBoardOpenState",
  default: false,
});

// predict slidebar state
export const selectedSliderList = atom<{ keyword: string; cnt: number }[]>({
  key: "selectedSliderList",
  default: [],
});
