import styled from "styled-components"
import { useNavigate } from "react-router-dom"

interface Props {
  isNarrow: boolean
}

const LoginBtn = ({ isNarrow }: Props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/user/login")
  }
  return (
    <>
      <LoginBtnDiv
        onClick={handleClick}
        className={isNarrow ? "isNarrow" : undefined}
      >
        로그인
      </LoginBtnDiv>
    </>
  )
}

export default LoginBtn

const LoginBtnDiv = styled.div`
  background: var(--custom-gradient-pink);

  // font
  font-size: 1.8rem;
  font-weight: bold;
  color: white;

  // cursor
  cursor: pointer;

  // padding
  padding: 12px;

  // border
  border-radius: 4px;

  // prevent drag
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  // isNarrow
  &.isNarrow {
    font-size: 1.2rem;
    padding: 8px;
  }
`
