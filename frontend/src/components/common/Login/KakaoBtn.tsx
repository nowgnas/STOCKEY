import styled, { keyframes } from "styled-components"
import BackBtn from "./BackBtn"

const KakaoBtn = () => {
  const REACT_APP_KAKAO_API = process.env.REACT_APP_KAKAO_API
  // const REACT_APP_KAKAO_REDIRECT = "https://stockey.kr/oauth/kakao"
  const REACT_APP_KAKAO_REDIRECT = process.env.REACT_APP_KAKAO_REDIRECT

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_API}&redirect_uri=${REACT_APP_KAKAO_REDIRECT}&response_type=code`

  return (
    <ButtonWrapper>
      <TitleDiv>SNS 로그인</TitleDiv>
      <TextDiv>간편하게 로그인/회원가입하고</TextDiv>
      <TextDiv>STOCKEY의 서비스를 이용해보세요</TextDiv>
      <ButtonA href={KAKAO_AUTH_URL}>
        <img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          alt="카카오 로그인"
          style={{ width: "60%" }}
        />
      </ButtonA>
      <BackBtn />
    </ButtonWrapper>
  )
}

export default KakaoBtn

const PopupAnime = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const ButtonWrapper = styled.div`
  // size
  height: 100%;
  width: 100%;

  // flex-box
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const TextDiv = styled.div`
  // font
  font-size: 1.5rem;
  color: var(--custom-black);

  opacity: 0;

  // animation
  animation: ${PopupAnime} 1s 0.4s 1 ease forwards;
`

const ButtonA = styled.a`
  // align
  text-align: center;

  // margin
  margin-top: 40px;

  opacity: 0;

  // animation
  animation: ${PopupAnime} 1s 0.6s 1 ease forwards;
`

export const TitleDiv = styled.div`
  // font
  font-size: 4.5rem;
  font-weight: bold;
  color: valr(--custom-black);

  // margin
  margin-top: 33vh;
  margin-bottom: 10px;

  opacity: 0;

  // transition
  transition: all 0.3s 1s ease-in-out;

  animation: ${PopupAnime} 1s 0.2s 1 ease forwards;
`
