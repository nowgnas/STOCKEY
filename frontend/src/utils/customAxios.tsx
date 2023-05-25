import axios from "axios"

interface axiosParamType {
  isAuthNeeded?: boolean
  navigate?: Function | undefined
}

// custom axios
// parameter => accessToken : accessToken 인증이 필요한 경우, argument 값으로 accessToken, setAccessToken을 넣어서 사용
// useQuery에서 사용하는 경우 사용하는 페이지에 직접 useQuery, useMutation을 정의하여 사용해야함
// login이 필요한 기능의 경우 useNavigate 객체를 navigate arg에 넣어서 사용해야 함
const customAxios = ({
  isAuthNeeded = false,
  navigate = undefined,
}: axiosParamType) =>
  // accessToken: string | undefined = undefined,
  // setAccessToken: Function | undefined = undefined,
  // navigate: Function | undefined = undefined}
  {
    const api = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}`,
      timeout: 20000,
      withCredentials: true,
    })
    // refresh 여부 확인 코드
    let isTokenRefreshing = false
    let refreshSubscribers: ((token: string) => void)[] = []

    // refresh 필요 함수 저장
    const subscribeTokenRefresh = (cb: (token: string) => void) => {
      refreshSubscribers.push(cb)
    }

    // refreshToken 재실행 코드
    const onRefreshed = (token: string) => {
      refreshSubscribers.forEach((cb) => cb(token))
    }

    // header에 accessToken 추가
    api.interceptors.request.use((config) => {
      if (isAuthNeeded && sessionStorage.getItem("accessToken")) {
        // config.headers["Authorization"] =
        //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImF1ZCI6IjE2Iiwibmlja25hbWUiOiLsp4TtmLjqs7Xsp4TtmLgiLCJleHAiOjE2OTAzODczMzR9.wtfN9xrf0ROIgX4C_0PGRB2YXrGXhWWxsd48hYtUGI4"
        config.headers["Authorization"] =
          "Bearer " + sessionStorage.getItem("accessToken")
      }
      return config
    })
    // api.interceptors.request.use((config) => {
    //   if (accessToken) {
    //     // config.headers["Authorization"] = "Bearer " + accessToken
    //   }
    //   return config
    // })

    // refresh token 요청 함수
    const getRefreshToken = async (): Promise<string | void> => {
      try {
        const { data: newAccessToken } = await axios.get(
          `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`,
          {
            timeout: 2000,
            withCredentials: true,
          }
        )

        isTokenRefreshing = false
        onRefreshed(newAccessToken)
        refreshSubscribers = []

        if (isAuthNeeded) {
          sessionStorage.setItem("accessToken", newAccessToken?.data)
          // setAccessToken(newAccessToken?.data)
        } else {
        }

        return newAccessToken?.data
      } catch (error) {
        isTokenRefreshing = false
        refreshSubscribers = []

        if (!isAuthNeeded) {
          sessionStorage.setItem("accessToken", "")
          // setAccessToken(undefined)
        }

        if (!!navigate) {
          window.alert("로그인이 필요합니다.")
          navigate("/user/login")
        }
      }
    }

    // refresh 요청 보내기
    api.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        const {
          config,
          response: { status },
        } = error
        const originalRequest = config

        if (status !== 401) {
          if (!!navigate) {
            window.alert("에러가 발생했습니다.")
            navigate("/stockeyErrorPage")
          }
          return Promise.reject(error)
        }

        if (isTokenRefreshing) {
          console.log("토큰 재발급 중")
          return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(axios(originalRequest))
            })
          })
        }
        isTokenRefreshing = true
        const newAccessToken = await getRefreshToken()

        if (typeof newAccessToken === "string") {
          config.headers.Authorization = `Bearer ${newAccessToken}`
          return axios(config)
        }

        return Promise.reject(error)
      }
    )

    return api
  }

export default customAxios
