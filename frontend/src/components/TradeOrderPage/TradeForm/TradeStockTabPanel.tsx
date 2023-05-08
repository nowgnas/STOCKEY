import styled from "styled-components"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TradeStockTabPanel = ({
  children = undefined,
  index,
  value,
}: TabPanelProps) => {
  return (
    <PanelWrapper
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <>{children}</>}
    </PanelWrapper>
  )
}

export default TradeStockTabPanel

const PanelWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  gap: 12px;
  min-height: 100%;
  max-height: 100%;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 15px;
  }
  ::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 24px;
    border: 5px solid transparent;
    background-clip: padding-box;
  }
  ::-webkit-scrollbar-track {
    width: 15px;
  }
`
