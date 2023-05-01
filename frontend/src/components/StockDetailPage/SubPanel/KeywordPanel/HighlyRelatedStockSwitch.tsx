import Button from "@mui/material/Button"
import CircleIcon from "@mui/icons-material/Circle"
import styled, { keyframes } from "styled-components"
import { useState } from "react"
import { Tooltip, Zoom } from "@mui/material"

interface Props {
  stockName: string
  color: string
}

const HighlyRelatedStockSwitch = ({ stockName, color }: Props) => {
  const [isSelected, setIsSelected] = useState(false)
  const btnClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsSelected((isSelected) => !isSelected)
  }
  return (
    <StockSwitchBtn
      disabled={false}
      size="large"
      colorTone={color}
      onClick={btnClickHandler}
    >
      <SwitchLayout isSelected={isSelected}>
        <CircleIcon
          sx={{ color: `var(--custom-${color}-1)` }}
          fontSize="large"
        />

        <BtnText isSelected={isSelected}>{stockName}</BtnText>
      </SwitchLayout>
    </StockSwitchBtn>
  )
  //
}

export default HighlyRelatedStockSwitch

const StockSwitchBtn = styled(Button)<{ colorTone: string }>`
  background-color: ${({ colorTone }) =>
    `var(--custom-${colorTone}-4)`} !important;
  border-radius: 36px !important;
  color: black !important;
  font-weight: bold !important;
  align-items: center !important;
`
const SwitchLayout = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: ${({ isSelected }) => (isSelected ? "row-reverse" : "row")}};
  justify-content: space-between;
  align-items: center;
  width: 100%;
  // animation: ${({ isSelected }) => (isSelected ? switchOn : switchOff)};
  // animation-duration: 0.5s;
  // animation-delay: 0s;
`
const BtnText = styled.p<{ isSelected: boolean }>`
  font-size: 1.4rem;
  margin: ${({ isSelected }) =>
    isSelected ? "0 0.5rem 0 0" : "0 0 0 0.5rem"}}; !important;
  line-height: normal;
  `

const switchOn = keyframes`
  0% {
    flex-direction: row;
  }
  100% {
    flex-direction: row-reverse;
  }
  `
const switchOff = keyframes`
  0% {
    flex-direction: row-reverse;
  }
  100% {
    flex-direction: row;
  }
  `
