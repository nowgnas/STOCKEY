import styled from "styled-components"
import { useRecoilValue } from "recoil"

import { nextTradeTimeState } from "../../stores/TradeAtoms"
import StockCardMini from "../LabPage/StockCardMini"
import { useNavigate } from "react-router-dom"
import Carousel from "nuka-carousel"

const PopTradeList = () => {
  const navigate = useNavigate()
  const nextHour = useRecoilValue(nextTradeTimeState).format("H")

  const goToDetail = (id: number) => {
    navigate(`/stock/${id}`)
  }

  return (
    <>
      <Header>{nextHour}시 거래 인기 종목</Header>
      <CarouselContainer>
        <Carousel
          autoplay
          autoplayInterval={1500}
          withoutControls
          wrapAround
          cellAlign="center"
          slidesToShow={7.5}
        >
          {DUMMYDATA.map((item, index) => {
            return (
              <Wrapper
                key={`${index}-popTrade`}
                id="slide"
                onClick={() => goToDetail(item.id)}
              >
                <StockCardMini item={item} />
              </Wrapper>
            )
          })}
        </Carousel>
      </CarouselContainer>
    </>
  )
}

export default PopTradeList

const CarouselContainer = styled.section`
  width: 100%;
  height: 20vh !important;
  overflow: hidden;

  & > .slider-container {
    height: 100%;
  }

  & > .slider-container > .slider-frame {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100% !important;
  }

  & > .slider-container > .slider-frame > .slider-list {
    height: 85% !important;
  }
`

const Wrapper = styled.section`
  height: 100%;
  cursor: pointer;
  margin: 0 5% 0 5%;
`
// animation: ${(props) => slide(props.slideWidth + 24)} 15s infinite;

const Header = styled.p`
  font-size: 32px;
  font-weight: bold;
  margin: 0;
`

const DUMMYDATA = [
  { id: 1, name: "카카오" },
  { id: 2, name: "naver" },
  { id: 3, name: "SKC" },
  { id: 4, name: "삼성전자" },
  { id: 5, name: "기아" },
  { id: 6, name: "현대차" },
  { id: 7, name: "LG전자" },
  { id: 8, name: "LG에너지솔루션" },
  { id: 9, name: "KB금융" },
  { id: 10, name: "기업은행" },
]
