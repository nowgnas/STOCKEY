import styled from "styled-components"
// sub components
import SubTitle from "../SubTitle"
import StockGraph from "./StockGraph"

interface Props {
  isActivate?: boolean
}

const MyStock = ({ isActivate = false }: Props) => {
  return (
    <>
      <MyStockWrapper className={isActivate ? "isActivate" : undefined}>
        <SubTitle
          subTitle="관심 종목"
          description="관심 등록한 종목을 간편하게 확인하세요"
        />
        <StockGraph />
      </MyStockWrapper>
    </>
  )
}

export default MyStock

const MyStockWrapper = styled.div`
  // padding & margin
  padding: 24px 0px;
  margin-top: 0px;

  // size
  height: 45vh;
  width: calc(83.33vw - 72px);

  // border
  border-radius: 24px;

  // 드래그 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  // transition
  transition: width 1s ease-in-out;

  &.isActivate {
    width: calc(50vw - 36px);
  }
`
