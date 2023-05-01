import styled, { keyframes } from "styled-components"

interface Props {
  gage: number
  height: string
  color: string
  backgroundColor: string
  animation: boolean
}

const GageBar = ({
  gage,
  height,
  color,
  backgroundColor,
  animation,
}: Props) => {
  return (
    <GageBarWrapper height={height}>
      <BackgroundBar bgColor={backgroundColor}>
        <ColoredBar gage={gage} color={color} animation={animation} />
      </BackgroundBar>
    </GageBarWrapper>
  )
}

export default GageBar

const Fill = (gage: number) => keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: ${gage * 10}%;
  }
`

const GageBarWrapper = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  display: flex;
  align-self: center;
`

const BackgroundBar = styled.div<{ bgColor: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 20px;
`
const ColoredBar = styled.div<{
  gage: number
  color: string
  animation: boolean
}>`
  width: ${({ gage }) => gage * 10}%;
  height: 100%;
  background-color: ${({ color }) => color};
  border-radius: 20px;
  position: absolute;
  left: 0;
  animation: ${({ animation, gage }) => (animation ? Fill(gage) : "")} 1s
    ease-in-out;
`
