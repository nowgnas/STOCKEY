import styled, { keyframes } from "styled-components"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import NicknameInput from "../components/common/Signup/NicknameInput"
import NicknameLogo from "../components/common/Signup/NicknameLogo"
import { useSignup } from "../hooks/useSignup"

// recoil
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil"
import { nicknameValidState } from "../stores/atoms"
import Spinner from "../components/common/Spinner/Spinner"
import { useNickname } from "../hooks/useNickname"

const SignupPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // nickname state
  const [nickname, setNickname] = useState<string | undefined>("")
  const isNicknameValid = useRecoilValue(nicknameValidState)
  const getNickname = (name: string | undefined) => {
    setNickname(name)
  }
  // accessToken state
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  // login State
  // const setLogIn = useSetRecoilState(logInState)

  // location state
  const oauthId = location.state.oauthId
  const oauthType = location.state.oauthType

  // react-query(custom hook)
  const {
    isLoading,
    data: token,
    isError,
    refetch, // 클릭 시, refetch를 통해 재실행 하게 됨
  } = useSignup({ nickname, oauthId, oauthType })
  const { refetch: refetchNickname } = useNickname()

  // click handling => fetch data
  const handleClick = () => {
    if (isNicknameValid) {
      refetch()
    }
  }

  // react-query data handling
  // 성공한 경우 token 처리
  useEffect(() => {
    console.log(token)
    if (token) {
      sessionStorage.setItem("accessToken", token)
      // setLogIn(true)
      refetchNickname()
      navigate("/stock", { replace: true })
    }
  }, [token])

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      navigate("/keyword", { replace: true })
    }
  }, [sessionStorage.getItem("accessToken")])

  // 로딩 및 에러 상황의 경우
  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    window.alert("다시 시도해 주세요")
    navigate("/user/login", { replace: true })
  }

  return (
    <>
      <SignupWrapper>
        <NicknameLogo />
        <NicknameInput nickname={nickname} getNickname={getNickname} />
        <NicknameSubmitBtn
          onClick={handleClick}
          className={isNicknameValid ? "activate" : undefined}
        >
          Stockey 시작하기
        </NicknameSubmitBtn>
      </SignupWrapper>
    </>
  )
}

export default SignupPage

const PopupAnime = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const NicknameSubmitBtn = styled.div`
  // size
  width: 300px;
  height: 80px;

  // font
  font-size: 2rem;
  font-weight: bold;
  color: white;

  // flex-box
  display: flex;
  justify-content: center;
  align-items: center;

  // border
  border-radius: 12px;

  // margin
  margin-top: 40px;

  // color
  background: #d9d9d9;
  opacity: 0;

  // animation
  animation: ${PopupAnime} 1s 0.8s 1 ease forwards;

  // 드래그 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  // transition
  transition: all 0.2s ease-in-out;

  // activate
  &.activate {
    background: var(--custom-gradient-pink);

    cursor: pointer;

    &:hover {
      font-size: 2.2rem;
    }
  }
`

const SignupWrapper = styled.div`
  // size
  width: 100%;
  height: 100%;

  // flex-box
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`
