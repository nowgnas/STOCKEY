import { memo, useEffect, useRef } from "react"
import styled from "styled-components"
import Grid from "@mui/material/Grid"

import { useDrag, useDrop } from "react-dnd"
import { getEmptyImage } from "react-dnd-html5-backend"
import { BasketList } from "./TradeForm"

interface Props {
  itemInfo: {
    index: number
    status: string
    name: string
    quantity: number
  }
  opacity?: number | undefined
  moveCardHandler?: (dragIndex: number, hoverIndex: number) => void
}

const TradeConfirmModalItem = ({
  itemInfo,
  opacity,
  moveCardHandler,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [, dragRef, previewRef] = useDrag(
    () => ({
      type: itemInfo.status,
      item: itemInfo,
      collect: (monitor) => ({
        //isDragging 변수가 현재 드래깅중인지 아닌지를 리턴
        isDragging: monitor.isDragging(),
      }),
    }),
    [itemInfo]
  )

  const [, drop] = useDrop({
    accept: ["MYBUY"],
    collect: (monitor) => ({
      getItem: monitor.getItem() as Props,
      getItemType: monitor.getItemType(),
    }),
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      // @ts-ignore
      const dragIndex = item.index
      const hoverIndex = itemInfo.index

      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCardHandler!(dragIndex, hoverIndex)
      //@ts-ignore
      item.index = hoverIndex
    },
  })

  dragRef(drop(ref))
  useEffect(() => {
    previewRef(getEmptyImage(), { captureDraggingState: true })
  }, [])

  return (
    <TextWrapper
      ref={itemInfo.status === "MYBUY" ? ref : null}
      opacity={opacity}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Text item xs={5} textAlign="center">
        <LogoImage src={`/logo_images/${itemInfo.name}.png`} />
        {itemInfo.name}
      </Text>
      <Text item xs={2} textAlign="center">
        {itemInfo.quantity}주
      </Text>
    </TextWrapper>
  )
}

export default memo(TradeConfirmModalItem)

const TextWrapper = styled(Grid)<{ opacity: number | undefined }>`
  margin: 5% 0 0 0;
  height: 15%;
  width: 100%;
  opacity: ${(props) => props.opacity};
`

const Text = styled(Grid)`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 12px;
  font-weight: bold;
  gap: 6px;
`

const LogoImage = styled.img`
  width: 20%;
  height: 100%;
  border-radius: 16px;
`
