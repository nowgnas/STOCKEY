import { atom } from "recoil"

// 키워드 관련 컴포넌트에 keywordId가 필요해서 데이터 구조를 바꾸었음..
export interface KeywordType {
  id: number
  name: string
}

export const KeywordSearchState = atom<KeywordType | undefined>({
  key: "KeywordSearchState",
  default: undefined,
})
