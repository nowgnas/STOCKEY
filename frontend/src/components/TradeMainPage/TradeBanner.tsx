import styled from "styled-components"
import TradeTimer from "./TradeTimer"
import BestTraderCard from "./BestTraderCard"

const TradeBanner = () => {
  return (
    <BannerWrapper>
      <TradeTimeInfoSection>
        <InfoHeader>거래 체결까지 남은 시간</InfoHeader>
        <InfoContent>
          {`정각마다 거래가 체결돼요!
            그 전까지 주문서를 제출해주세요!`}
        </InfoContent>
        <TradeTimer />
      </TradeTimeInfoSection>
      <BestTraderCard />
    </BannerWrapper>
  )
}

export default TradeBanner

const BannerWrapper = styled.div`
  // 레이아웃
  display: flex;
  width: 100%;
  height: auto;
  padding: 6rem 4.8rem;
  margin-top: 4.8rem;

  // 스타일
  background-color: var(--custom-background);
`

const TradeTimeInfoSection = styled.div`
  // 레이아웃
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 3.6rem;

  // 텍스트
  & > p {
    margin: 0 0 3.6rem 0;
  }
`

const InfoHeader = styled.p`
  font-size: 4.8rem;
  font-weight: bold;
`
const InfoContent = styled.p`
  // 스타일
  font-size: 2.2rem;
  font-weight: 400;
  line-height: 6.4rem;
  color: var(--custom-gray-1);
  white-space: pre-line;
`
