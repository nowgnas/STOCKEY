import styled, { keyframes } from "styled-components"
import { useNavigate } from "react-router-dom"

const BackBtn = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/stock")
  }

  return (
    <>
      <ButtonA onClick={handleClick}>로그인/회원가입 없이 둘러보기</ButtonA>
    </>
  )
}

export default BackBtn

const PopupAnime = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const ButtonA = styled.a`
  //font
  font-size: 1.5rem;
  font-weight: normal;
  color: #6d6666;
  text-decoration: underline;

  // margin
  margin-top: 40px;
  cursor: pointer;

  opacity: 0;

  // animation
  animation: ${PopupAnime} 1s 0.8s 1 ease forwards;
`
