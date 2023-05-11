import Carousel from "nuka-carousel"
import TraderCard from "./TraderCard"

const BestTraderCarousel = () => {
  return (
    <Carousel
      autoplay
      autoplayInterval={2000}
      cellSpacing={0}
      withoutControls
      wrapAround
      cellAlign="center"
      slidesToShow={1.5}
      animation="zoom"
      zoomScale={0.75}
    >
      <TraderCard name="경희경희" account={87920000} rank={1} />
      <TraderCard name="하은하은" account={77920000} rank={2} />
      <TraderCard name="현철현철" account={67920000} rank={3} />
    </Carousel>
  )
}

export default BestTraderCarousel
