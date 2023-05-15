import dayjs from "dayjs"

export function setWithExpiry(
  key: string,
  value: object | null,
  currentList: []
) {
  const now = dayjs()
  const nextHour = now.hour() + 1
  const nextTime = dayjs().hour(nextHour).minute(0).second(0)

  const item = {
    value: value ? [value, ...currentList] : [...currentList],
    expiry: nextTime.valueOf(),
  }
  localStorage.setItem(key, JSON.stringify(item))
}
