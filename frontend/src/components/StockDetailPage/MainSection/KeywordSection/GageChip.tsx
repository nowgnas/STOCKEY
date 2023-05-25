import styled from "styled-components"

interface Props {
  gage: number
  color: string
  backgroundColor: string
}
const GageChip = ({ gage, color, backgroundColor }: Props) => {
  return (
    <Badge color={color} bgColor={backgroundColor}>
      {gage.toFixed(2)}%
    </Badge>
  )
}

export default GageChip

const Badge = styled.div<{ color: string; bgColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  border: 2px solid ${({ color }) => color};
  color: ${({ color }) => color};
  font-size: 1.6rem;
  font-weight: bold;
  background-color: ${({ bgColor }) => bgColor};
`
