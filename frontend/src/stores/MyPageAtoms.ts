import { atom } from "recoil"

interface MyKeywordProps {
  id: number
  name: string
}

export const myKeywordState = atom<MyKeywordProps | undefined>({
  key: "myKeywordState",
  default: undefined,
})
