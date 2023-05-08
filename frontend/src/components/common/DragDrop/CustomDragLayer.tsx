import styled from "styled-components"
import type { XYCoord } from "react-dnd"
import { useDragLayer } from "react-dnd"

// import { BoxDragPreview } from "./BoxDragPreview"
import TradeStockItem from "../../TradeOrderPage/TradeForm/TradeStockItem"
import StockCardMini from "../../LabPage/StockCardMini"
import KeywordCardMini from "../../LabPage/KeywordCardMini"
import TradeConfirmModalItem from "../../TradeOrderPage/TradeForm/TradeConfirmModalItem"

interface RenderWrapper {
  initialOffset: XYCoord | null
  currentOffset: XYCoord | null
}

export const CustomDragLayer = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }))

  const renderItem = () => {
    switch (itemType) {
      case "BUY":
        return <TradeStockItem item={item} />
      case "SELL":
        return <TradeStockItem item={item} />
      case "MYSELL":
        return <TradeConfirmModalItem itemInfo={item} />
      case "STOCK":
        return <StockCardMini item={item} />
      case "KEYWORD":
        return <KeywordCardMini item={item} />
      default:
        return null
    }
  }

  if (!isDragging) {
    return null
  }
  return (
    <LayerStyles>
      <RenderWrapper
        initialOffset={initialOffset}
        currentOffset={currentOffset}
      >
        {renderItem()}
      </RenderWrapper>
    </LayerStyles>
  )
}

const LayerStyles = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 30%;
  height: 100%;
`
const RenderWrapper = styled.div<RenderWrapper>`
  display: ${(props) => {
    if (!props.initialOffset || !props.currentOffset) {
      return "none;"
    }
  }}
  transform:${(props) => {
    if (!props.initialOffset || !props.currentOffset) {
      return ""
    }
    let { x, y } = props.currentOffset!
    return `translate(${x}px, ${y}px);`
  }}
  -webkit-transform: ${(props) => {
    if (!props.initialOffset || !props.currentOffset) {
      return ""
    }
    let { x, y } = props.currentOffset!
    return `translate(${x}px, ${y}px);`
  }}
  background: var(--custom-gray-4);
  border-radius: 24px;
  padding:3px;
`
