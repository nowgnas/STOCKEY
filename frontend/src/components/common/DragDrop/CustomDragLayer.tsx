import {useRef} from 'react';
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

  const baseSize = useRef<string[]>(["", ""]);

  const renderItem = () => {
    switch (itemType) {
      case "BUY":
        baseSize.current = ["30%"]
        return <TradeStockItem item={item} />
      case "SELL":
        baseSize.current = ["30%"]
        return <TradeStockItem item={item} />
      case "MYBUY":
        baseSize.current = ["30%"]
        return <TradeConfirmModalItem itemInfo={item} />
      case "STOCK":
        baseSize.current = ["110px", "110px"]
        return <StockCardMini item={item} />
      case "KEYWORD":
        baseSize.current = ["110px", "110px"]
        return <KeywordCardMini item={item} />
      default:
        return null
    }
  }

  if (!isDragging) {
    return null
  }
  return (
    <LayerStyles baseSize={baseSize.current}>
      <RenderWrapper
        initialOffset={initialOffset}
        currentOffset={currentOffset}
      >
        {renderItem()}
      </RenderWrapper>
    </LayerStyles>
  )
}

const LayerStyles = styled.div<{baseSize: string[]}>`
  position: fixed;
  pointer-events: none;
  z-index: 2000;
  left: 0;
  top: 0;

  width: ${props => props.baseSize[0]};
  height: ${props => props.baseSize[1]};
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
  
  width: 100%;
  height: 100%;
`
