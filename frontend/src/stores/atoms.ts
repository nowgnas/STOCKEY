import { atom, selector } from "recoil"

// 닉네임 유효성 검사 State
export const nicknameValidState = atom<boolean>({
  key: "nicknameValidState",
  default: false,
})

// accessToken 저장 State
export const accessTokenState = atom<string | undefined>({
  key: "accessToken",
  default: sessionStorage.getItem("accessToken") as string | undefined,
  // default: undefined,
})

// login State
export const logInState = selector<boolean>({
  key: "logInState",
  get: ({ get }) => {
    return Boolean(
      get(accessTokenState) !== undefined || get(nicknameState) !== ""
    )
  },
})

// nickname State
export const nicknameState = atom<string>({
  key: "nicknameState",
  default: "",
})
