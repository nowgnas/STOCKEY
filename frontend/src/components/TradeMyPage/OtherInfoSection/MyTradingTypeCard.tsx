import styled from "styled-components"

const MyTradingTypeCard = () => {
  return (
    <CardWrapper>
      <CardHeader>
        <TypeTextDiv>
          <MyTypeIs>내 투자 성향은</MyTypeIs>
          <TradingType>청개구리</TradingType>
        </TypeTextDiv>
        <TypeIcon src="/tradeLogos/frog.png" alt="TradeTypeIcon" />
      </CardHeader>
      <CardContent>
        남들이 살 때는 팔고, 팔 때는 사는 청개구리 타입 용감하구 어쩌구 저쩌구
        타입 설명 ~~
      </CardContent>
    </CardWrapper>
  )
}

export default MyTradingTypeCard

const CardWrapper = styled.div`
  // 레이아웃
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 36px;

  // 스타일
  border-radius: 24px;
  background-color: var(--custom-gray-1);
  font-weight: bold;
`

const CardHeader = styled.div`
  // 레이아웃
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8%;
`
const CardContent = styled.div`
  // 스타일
  color: var(--custom-gray-3);
  font-size: 1.6rem;
`

const TypeTextDiv = styled.div`
  // 레이아웃
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  height: 100%;

  & p {
    margin: 0;
  }
`

const MyTypeIs = styled.p`
  font-size: 2rem;
  color: var(--custom-gray-2);
`
const TradingType = styled.p`
  font-size: 2.8rem;
  color: white;
`
const TypeIcon = styled.img`
  width: 10em;
  height: 10em;
  background-color: var(--custom-green-4);
  border-radius: 24px;
`
