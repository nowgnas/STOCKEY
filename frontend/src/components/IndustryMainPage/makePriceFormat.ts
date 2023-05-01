export const makePriceFormat = (num: number) => {
  let roundedNum = Math.round(num / 100000000)
  let result = "원"
  let unitWord = "억"
  while (roundedNum > 0) {
    let chunk = roundedNum % 10000
    result =
      chunk.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + unitWord + result
    roundedNum = Math.floor(roundedNum / 10000)
    unitWord = "조 "
  }
  return result
}
