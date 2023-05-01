// callback 함수를 delay 이후 실행 & 새롭게 callback이 선언될 경우 delay를 초기화 후 다시 측정
const debounceFunction = (callback: Function, delay: number) => {
  let timer: string | number | NodeJS.Timeout | undefined
  return (args: string | undefined) => {
    // 실행한 함수(setTimeout())를 취소
    clearTimeout(timer)

    // delay가 지나면 callback 함수를 실행
    timer = setTimeout(() => callback(args), delay)
  }
}

export default debounceFunction
