import styled from "styled-components"

interface Props {
  myBalance: number
}

const TradeFormBalance = ({ myBalance }: Props) => {
  const internationalNumberFormat = new Intl.NumberFormat("en-US")

  // 나중에 useQuery 사용해서 내 잔액 가져오기
  // 다음 정각때 query 삭제하고 다시 받아오기
  return (
    <BalanceContainer>
      <BalanceWrapper>
        <BalanceText>내 잔액</BalanceText>
        <BalanceMoneyText>
          \{internationalNumberFormat.format(myBalance)}
        </BalanceMoneyText>
      </BalanceWrapper>
      <BalanceImg src={"/tradeLogos/moneyBag.png"} />
    </BalanceContainer>
  )
}

export default TradeFormBalance

const BalanceContainer = styled.section`
  padding: 3%;
  border-radius: 24px;
  background: var(--custom-yellow-4);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 20%;
  overflow: hidden;
  margin-bottom: 5%;

  @media (max-width: 500px) {
    padding: 5%;
  }
`

const BalanceWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  aligin-items: center;
  font-weight: bold;
  width: 30%;
`
const BalanceText = styled.p`
  font-size: 12px;
  margin: 2%;

  @media (max-width: 500px) {
    font-size: 12px;
  }
`

const BalanceMoneyText = styled.p`
  font-size: 24px;
  margin: 2%;

  @media (max-width: 500px) {
    font-size: 18px;
  }
`

const BalanceImg = styled.img`
  position: relative;
  width: 30%;
  height: 120%;
  top: 0.5rem;
  left: 5%;
`
