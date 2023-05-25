import styled, { keyframes } from "styled-components"

const NicknameBtn = (handleClick: React.MouseEventHandler<HTMLDivElement>) => {
  return (
    <>
      <ButtonDiv>STOCKEY 시작하기</ButtonDiv>
    </>
  )
}

export default NicknameBtn

const PopupAnime = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const ButtonDiv = styled.div`
  width: 300px;
  height: 100px;

  background-color: var(--custom-gradient-pink);
  opacity: 0;

  // animation
  animation: ${PopupAnime} 1s 0.8s 1 ease forwards;
`
