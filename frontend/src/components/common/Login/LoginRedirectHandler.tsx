import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Spinner from "../Spinner/Spinner"
import { useUserInfo } from "../../../hooks/useUserInfo"

const KAKAO_CODE = new URL(window.location.href).searchParams.get("code")

const LoginRedirectHandler = () => {
  const navigate = useNavigate()
  // react-query 호출
  const {
    isLoading,
    data: userData,
    isSuccess,
    isError,
  } = useUserInfo(KAKAO_CODE ? KAKAO_CODE : "")

  useEffect(() => {
    console.log("inHere", userData, "성공여부", isSuccess)
    if (userData?.status === 201) {
      console.log("201이떴엉")
      navigate("/user/signup", {
        replace: true,
        state: {
          oauthId: userData?.data.data.oauthMemberId,
          oauthType: userData?.data.data.oauthType,
        },
      })
    }
  }, [userData, isSuccess])

  if (isLoading) return <Spinner />
  return <></>
}

export default LoginRedirectHandler
