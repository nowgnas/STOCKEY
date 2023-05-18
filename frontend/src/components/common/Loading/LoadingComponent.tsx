import styled, { keyframes } from "styled-components"

interface Props {
  top?: number | undefined
}

const LoadingComponent = ({top = 30}: Props) => {
  return (
    <LoaderContainer>
      <LoaderWrapper top={top}>
        <Circle></Circle>
        <Circle></Circle>
        <Circle></Circle>
        <Shadow></Shadow>
        <Shadow></Shadow>
        <Shadow></Shadow>
      </LoaderWrapper>
    </LoaderContainer>
  )
}
export default LoadingComponent

const LoaderContainer = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
`
const LoaderWrapper = styled.div<{top: number}>`
  width: 200px;
  height: 50%;
  position: absolute;
  left: 50%;
  top: ${props => props.top}%;
  transform: translate(-50%, 0%);
`
const CircleAnimation = keyframes`
0%{
  top:60px;
  height:5px;
  border-radius: 50px 50px 25px 25px;
  transform: scaleX(1.7);
}
40%{
  height:20px;
  border-radius: 50%;
  transform: scaleX(1);
}
100%{
  top:0%;
}
`

const ShadowAnimation = keyframes`
0%{
  transform: scaleX(1.5);
}
40%{
  transform: scaleX(1);
  opacity: .7;
}
100%{
  transform: scaleX(.2);
  opacity: .4;
}
`

const Circle = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 50%;
  background-color: #ff6f9d;
  left: 15%;
  transform-origin: 50%;
  animation: ${CircleAnimation} 0.5s alternate infinite ease;

  &:nth-child(2) {
    background-color: #ff9d6a;
    left: 45%;
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    background-color: #bfa0ff;
    left: auto;
    right: 15%;
    animation-delay: 0.3s;
  }
`

const Shadow = styled.div`
  width: 20px;
  height: 4px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 62px;
  transform-origin: 50%;
  z-index: -1;
  left: 15%;
  filter: blur(1px);
  animation: ${ShadowAnimation} 0.5s alternate infinite ease;

  &:nth-child(4) {
    left: 45%;
    animation-delay: 0.2s;
  }
  &:nth-child(5) {
    left: auto;
    right: 15%;
    animation-delay: 0.3s;
  }
`
