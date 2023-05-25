import styled from "styled-components"
import LoginBtn from "./LoginBtn"
import { useRecoilValue } from "recoil"
// import { logInState, accessTokenState } from "../../../stores/atoms"
import { useNickname } from "../../../hooks/useNickname"
import Avatar, { genConfig } from "react-nice-avatar"
// import { useEffect } from "react"

interface Props {
  isNarrow: boolean
}

const ProfileInfo = ({ isNarrow }: Props) => {
  // login state
  // const isLogin = useRecoilValue(logInState)
  // // const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const { data: nickname, isLoading } = useNickname()

  if (isLoading) return <p style={{ color: "white" }}>로딩중</p>

  return (
    <>
      <ProfileDiv className={isNarrow ? "isNarrow" : undefined}>
        {nickname ? (
          <>
            <Avatar
              {...genConfig(nickname)}
              shape="rounded"
              style={{
                width: "100%",
                height: "10rem",
              }}
              className={isNarrow ? "isNarrow" : undefined}
            />
            {isNarrow ? undefined : <ProfileName>{nickname}</ProfileName>}
          </>
        ) : (
          <>
            {isNarrow ? undefined : (
              <LoginTextDiv>
                <b>STOCKEY</b>를 <br /> 시작해보세요
              </LoginTextDiv>
            )}
            <LoginBtn isNarrow={isNarrow} />
          </>
        )}
      </ProfileDiv>
    </>
  )
}

export default ProfileInfo

// 프로필 이미지 styled
const LoginTextDiv = styled.div`
  font-size: calc(0.5vw + 1rem);
  font-weight: normal;
  color: white;

  // padding & margin:
  padding: 0px 8px 0px 8px;
  margin-bottom: 24px;

  // line-height
  line-height: 36px;
  text-align: center;
`
// 사용자 이름 styled
const ProfileName = styled.div`
  // 글자
  font-weight: bold;
  font-size: 24px;
  color: white;
  text-align: center;

  // margin
  margin-top: 36px;
`
// 닉네임 작성 styled
const ProfileDiv = styled.div`
  // 내부 패딩
  padding: 45px 0px;

  // 크기
  width: 100%;

  // 세로 중앙 정렬
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // 하단 경계선
  border-bottom: solid #bbbbbb 0.5px;

  // isNarrow
  &.isNarrow {
    padding: 12px 0px 24px 0px;
  }

  // 드래그 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const AvatarDiv = styled.div`
  // flex-box;
  display: flex;
  justify-content: center;
  align-items: center;

  // background
  background: var(--custom-gradient-pink);

  // font
  font-size: 3rem;
  font-weight: bold;
  color: white;

  // size
  width: 60px;
  height: 60px;

  // border
  border-radius: 100px;

  &.isNarrow {
    font-size: 2rem;
    width: 48px;
    height: 48px;
  }
`
