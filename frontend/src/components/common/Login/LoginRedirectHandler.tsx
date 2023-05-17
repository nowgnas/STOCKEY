import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import Spinner from "../Spinner/Spinner"

import { useRecoilState, useSetRecoilState } from "recoil"
import { accessTokenState, logInState } from "../../../stores/atoms"
import { useUserInfo } from "../../../hooks/useUserInfo"

const KAKAO_CODE = new URL(window.location.href).searchParams.get("code")

const LoginRedirectHandler = () => {
  const navigate = useNavigate()
  // accessToken state
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  // loginState
  // const setLogIn = useSetRecoilState(logInState)
  // react-query 호출
  const {
    isLoading,
    data: userData,
    isError,
  } = useUserInfo(KAKAO_CODE ? KAKAO_CODE : "")

  useEffect(() => {
    if (isError) {
      window.alert("로그인 오류 발생")
      navigate("/user/login", { replace: true })
    }
    if (userData?.status === 201) {
      navigate("/user/signup", {
        replace: true,
        state: {
          oauthId: userData?.data.data.oauthMemberId,
          oauthType: userData?.data.data.oauthType,
        },
      })
    } else if (userData?.status === 200) {
      setAccessToken(userData.data.data.accessToken)
      // setLogIn(true)
    }
  }, [userData, isError])

  useEffect(() => {
    if (accessToken) {
      console.log("네비게이트 시작", accessToken)
      navigate("/stock", { replace: true })
      console.log("네비게이트 끝남", accessToken)
    }
  }, [accessToken])

  if (isLoading) return <Spinner />
  return <></>
}

export default LoginRedirectHandler
