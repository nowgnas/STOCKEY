import styled from "styled-components"
import { useRecoilValue } from "recoil"

import { nextTradeTimeState } from "../../stores/TradeAtoms"
import StockCardMini from "../LabPage/StockCardMini"
import { useNavigate } from "react-router-dom"
import Carousel from "nuka-carousel"
import { usePopList } from "../../hooks/useTradeForm"

const PopTradeList = () => {
  const navigate = useNavigate()
  const nextHour = useRecoilValue(nextTradeTimeState).format("H")

  const { data: popList } = usePopList()
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
          wrapAround={popList && popList.length > 8 ? true : false}
          cellAlign={popList && popList.length > 8 ? "center" : "left"}
          slidesToShow={7.5}
        >
          {popList && popList.length > 0 ? (
            popList.map(
              (item: { stockId: number; stockName: string }, index: number) => {
                return (
                  <Wrapper
                    key={`${index}-popTrade`}
                    id="slide"
                    onClick={() => goToDetail(item.stockId)}
                  >
                    <StockCardMini
                      item={{ id: item.stockId, name: item.stockName }}
                    />
                  </Wrapper>
                )
              }
            )
          ) : (
            <NoPopLIstText>현재 인기 종목이 없습니다.</NoPopLIstText>
          )}
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

const NoPopLIstText = styled.p``
