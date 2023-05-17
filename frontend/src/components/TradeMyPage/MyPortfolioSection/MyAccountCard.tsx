import styled from "styled-components"
import TradeShortcutCard from "../../TradeMainPage/TradeShortcutCard"
import { PanelTitle } from "../../StockDetailPage/SubPanel/KeywordPanel/KeywordPanel"
import { useMyAsset } from "../../../hooks/useMyAsset"

const MyAccountCard = () => {
  const { data: my } = useMyAsset()

  return (
    <>
      <PanelTitle style={{ marginTop: "0", marginBottom: "1.6rem" }}>
        내 자산
      </PanelTitle>
      <AccountCardWrapper>
        <TotalBalance>
          <TradeShortcutCard
            title="총 자산"
            content={`₩ ${my?.totalAssets.toLocaleString()}`}
            imageSrc="moneyBag"
            bgColor="--custom-purple-3"
            navPage=""
          />
        </TotalBalance>

        <DetailedBalance>
          <BalanceItem
            style={{ borderBottom: "2px solid var(--custom-purple-3)" }}
          >
            <span>주식</span>
            <p>{`₩ ${my?.stockValuation.toLocaleString()}`}</p>
          </BalanceItem>
          <BalanceItem>
            <span>예수금</span>
            <p>{`₩ ${my?.deposit.toLocaleString()}`}</p>
          </BalanceItem>
        </DetailedBalance>
      </AccountCardWrapper>
    </>
  )
}

export default MyAccountCard

const AccountCardWrapper = styled.div`
  // 레이아웃
  width: 100%;
  display: flex;
  overflow: hidden;

  // 스타일
  border-radius: 36px;
  border: 4px solid var(--custom-purple-4);
  background-color: var(--custom-purple-4);
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
`
const TotalBalance = styled.div`
  // 레이아웃
  width: 50%;
  // <TradeShortcutCard/>의 폰트 사이즈 커스텀
  & p {
    font-size: 1.8rem;
  }
`
const DetailedBalance = styled.div`
  // 레이아웃
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  // 스타일
  background-color: transparent;
  border-radius: 24px;
`
const BalanceItem = styled.div`
  // 레이아웃
  width: 80%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5% 0%;

  // 스타일
  font-weight: bold;
  background-color: transparent;
  & span {
    font-size: 1.3rem;
    color: var(--custom-gray-1);
  }
  & p {
    font-size: 1.6rem;
    color: var(--custom-black);
    margin-bottom: 0.5rem;
  }
`
