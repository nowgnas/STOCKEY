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
  border: 3px solid var(--custom-purple-4);
  box-shadow: var(--custom-purple-4) 0px 0px 12px 1px;

  // font
  font-size: 1.8rem;
  font-weight: bold;
  color: white;

  // cursor
  cursor: pointer;

  // padding
  padding: 12px;

  // border
  border-radius: 12px;

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
