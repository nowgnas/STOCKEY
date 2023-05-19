import dayjs from "dayjs"
import { BasketList } from "./TradeForm"

export function setWithExpiry(
  key: string,
  value: object | null,
  currentList: [] | BasketList[]
) {
  const now = dayjs()
  // const nextHour = now.hour() + 1
  // const nextTime = dayjs().hour(nextHour).minute(0).second(0)
  const nextTime = now.add(1, "minute").startOf("minute")
  const item = {
    value: value ? [value, ...currentList] : [...currentList],
    expiry: nextTime.valueOf(),
  }
  localStorage.setItem(key, JSON.stringify(item))
}
