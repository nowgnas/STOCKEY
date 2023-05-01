import styled from "styled-components"
import { useIndustryStockList } from "../../../hooks/useIndustryStockList"
import StockList from "./StockList"
import Spinner from "../../common/Spinner/Spinner"
import { HighlightedSpan } from "../../StockDetailPage/MainSection/PriceSection/PriceSection"

interface Props {
  industryId: number
  industryName: string
}

const AllIncludedStockListArea = ({ industryId, industryName }: Props) => {
  const { isLoading, data: stockList } = useIndustryStockList(industryId)

  return (
    <AreaDiv>
      <TitleDiv>
        <HighlightedSpan color="var(--custom-mint)">
          {industryName}
        </HighlightedSpan>{" "}
        산업의 다른 종목들도 살펴보세요
      </TitleDiv>
      <CardListWrapper>
        {isLoading ? (
          <Spinner />
        ) : !!stockList ? (
          <StockList stockList={stockList} />
        ) : (
          <></>
        )}
      </CardListWrapper>
    </AreaDiv>
  )
}

export default AllIncludedStockListArea

const AreaDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const TitleDiv = styled.div`
  height: 2rem;
  width: auto;
  padding: 0px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2rem;
  /* or 83% */

  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
`

const CardListWrapper = styled.div`
  width: 100%;
  min-height: 350px;
  height: 25vh;
  padding: 24px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
  background-color: #f8f8f8;
`
