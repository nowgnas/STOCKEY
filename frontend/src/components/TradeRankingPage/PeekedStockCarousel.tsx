import Carousel from "nuka-carousel"
import StockCardMini from "../LabPage/StockCardMini"
import styled from "styled-components"

const PeekedStockCarousel = () => {
  return (
    <Carousel
      autoplay
      autoplayInterval={2000}
      cellSpacing={24}
      withoutControls
      wrapAround
      cellAlign="center"
      slidesToShow={4}
    >
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <SquareWrapper key={index}>
            <SquareContent>
              <StockCardMini item={{ id: 7, name: "KB금융" }} />
            </SquareContent>
          </SquareWrapper>
        )
      })}
    </Carousel>
  )
}

export default PeekedStockCarousel

export const SquareWrapper = styled.div`
  position: relative;
  ::after {
    content: "";
    padding-bottom: 100%;
    display: block;
  }
`

export const SquareContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10%;
  background-color: transparent;
  cursor: pointer;
`
