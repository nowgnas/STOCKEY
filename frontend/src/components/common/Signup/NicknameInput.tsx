import styled, { keyframes } from "styled-components"
import { useState, useEffect, useCallback } from "react"
import debounceFunction from "../Debouncer/Debouncer"
import customAxios from "../../../utils/customAxios"

// recoil
import { useRecoilState } from "recoil"
import { nicknameValidState } from "../../../stores/atoms"

type props = {
  nickname: string | undefined
  getNickname: Function
}

const NicknameInput = ({ nickname, getNickname }: props) => {
  // 닉네임 유효성 state
  const [isDuplicated, setIsDuplicated] = useRecoilState(nicknameValidState)
  const [isValid, setIsValid] = useState<boolean>(false)
  // input focus state
  const [isFocus, setIsFocus] = useState<boolean>(false)

  // input focus handling
  const handleFocus = () => {
    setIsFocus(true)
  }
  const handleBlur = () => {
    setIsFocus(false)
  }

  // debouncer를 통한 타이핑 완료 후 닉네임 저장
  const printValue = useCallback(
    debounceFunction((value: string | undefined) => {
      getNickname(value)
    }, 300),
    []
  )

  // input onChangeHandler
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    setIsDuplicated(false)
    setIsValid(false)
    printValue(event?.target.value)
  }

  // nickname 변화 이후 validate 검사(길이) 수행
  useEffect(() => {
    // 길이 유효성 검사
    const nicknameTest = /^[가-힣a-zA-Z0-9]+$/
    const validity = nickname
      ? nickname?.trim()
        ? nickname?.length >= 4 && nickname?.length <= 8
          ? nicknameTest.test(nickname)
            ? true
            : false
          : false
        : false
      : false

    setIsValid(validity)
  }, [nickname])

  // nickname이 유효하다면(isValid === true) 중복성 검사
  useEffect(() => {
    const axios = customAxios({})
    // 서버에 닉네임을 송신하는 코드
    const checkNickname = async () => {
      try {
        const validity = await axios
          .get("/member/nickname", { params: { nickname: nickname } })
          .then((response) => {
            return response.status
          })
          .catch((error) => {
            return error.status
          })

        // 닉네임 중복 검사 유효할 경우
        if (validity === 200) {
          setIsDuplicated(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (isValid) {
      checkNickname()
    }
  }, [isValid, setIsDuplicated])

  return (
    <>
      <CustomInput
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={
          nickname?.trim()
            ? !isValid || !isDuplicated
              ? "isError"
              : "onFocus"
            : isFocus
            ? "onFocus"
            : undefined
        }
        placeholder={!isFocus ? "한글, 영문 및 숫자 4~8자" : undefined}
      />
      {nickname ? (
        nickname.trim() ? (
          nickname.length >= 4 && nickname.length <= 8 ? (
            /^[가-힣a-zA-Z0-9]+$/.test(nickname) ? (
              isDuplicated ? (
                <ErrorDiv>사용가능한 닉네임입니다</ErrorDiv>
              ) : (
                <ErrorDiv className="isError">
                  이미 존재하는 닉네임입니다
                </ErrorDiv>
              )
            ) : (
              <ErrorDiv className="isError">
                닉네임은 한글, 영어, 숫자만 사용가능합니다
              </ErrorDiv>
            )
          ) : (
            <ErrorDiv className="isError">
              닉네임의 길이는 4~8자 입니다
            </ErrorDiv>
          )
        ) : (
          <ErrorDiv className="isError">
            닉네임에 공백을 넣을 수 없습니다
          </ErrorDiv>
        )
      ) : (
        <ErrorDiv></ErrorDiv>
      )}
    </>
  )
}

export default NicknameInput

const PopupAnime = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`

const CustomInput = styled.input`
  // 테두리 없애기
  border: none;
  outline: none;

  // size
  width: 300px;

  // font
  font-size: 2.2rem;
  font-weight: bold;
  text-align: center;

  // border
  border-bottom: 1px gray solid;

  // margin & padding
  margin-top: 30px;
  padding: 12px;

  // transition
  transition: all 0.1s ease-in-out;

  opacity: 0;

  // animation
  animation: ${PopupAnime} 1s 0.6s 1 ease forwards;

  // focus class
  &.onFocus {
    border-bottom: 5px solid;
    border-image: var(--custom-gradient-pink);
    border-image-slice: 1;
  }

  // placeholder
  ::placeholder {
    font-size: 1.5rem;
    font-weight: normal;
  }

  // Error
  &.isError {
    border-bottom: 5px red solid;
  }
`

const ErrorDiv = styled.div`
  // size
  height: 20px;
  // font
  font-size: 1.5rem;
  font-weight: normal;
  color: gray;

  &.isError {
    color: red;
  }
`
