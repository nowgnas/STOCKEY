import { atom, selector, useRecoilState } from "recoil"

// 닉네임 유효성 검사 State
export const nicknameValidState = atom<boolean>({
  key: "nicknameValidState",
  default: false,
})

// accessToken 저장 State
const accessTokenState = atom<string | undefined>({
  key: "accessToken",
  default: undefined,
})

// accessToken의 getter & setter
export const accessTokenSelector = selector({
  key: "setAccessToken",
  get: ({ get }) => get(accessTokenState),
  set: ({ set }, newValue) => {
    set(accessTokenState, newValue)
  },
})

// login Stae
export const logInState = atom<boolean>({
  key: "logInState",
  default: false,
})

// nickname State
export const nicknameState = atom<string>({
  key: "nicknameState",
  default: "",
})
