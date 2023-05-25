import { atom, selector } from "recoil"
import dayjs, { Dayjs } from "dayjs"
import duration from "dayjs/plugin/duration"

dayjs.extend(duration)

// 현재 시간
export const currentTimeState = atom<Dayjs>({
  key: "currentTimeState",
  default: dayjs(),
})

// 다음 거래 체결 시간
export const nextTradeTimeState = selector({
  key: "nextTradeTimeState",
  // get: ({ get }) => get(currentTimeState).add(1, "hour").startOf("hour"),
  get: ({ get }) => get(currentTimeState).add(1, "minute").startOf("minute"),
})

// 다음 거래 체결까지 남은 시간 (시, 분, 초)
export const timeLeftState = selector({
  key: "timeLeftState",
  get: ({ get }) => {
    const timeLeft = dayjs.duration(
      get(nextTradeTimeState).diff(get(currentTimeState))
    )
    return {
      hoursLeft: timeLeft.format("HH"),
      minutesLeft: timeLeft.format("mm"),
      secondsLeft: timeLeft.format("ss"),
    }
  },
})

export const timeLeftNumsState = selector({
  key: "timeLeftNumsState",
  get: ({ get }) => {
    const timeLeft = get(nextTradeTimeState).diff(get(currentTimeState))
    return { timeLeft }
  },
})
