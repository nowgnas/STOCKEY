import styled from "styled-components"
import MarketCapCardList from "./MarketCapCardList"
import { useMarketCapRank } from "../../../../hooks/useMarketCapRank"
import { ClickedIndustryInfoType } from "../IndustryMarketCapInfoArea"
import Spinner from "../../../common/Spinner/Spinner"

const MarketCapRankArea = ({
  clickedIndustryInfo,
}: {
  clickedIndustryInfo: ClickedIndustryInfoType
}) => {
  const { isLoading, data: marketCapRankList } = useMarketCapRank(
    clickedIndustryInfo.id
  )
  return (
    <AreaDiv>
      <TitleDiv>
        <IndustryNameSpan nameColor={clickedIndustryInfo.color}>
          {clickedIndustryInfo.name}
        </IndustryNameSpan>{" "}
        종목 시총 순위
      </TitleDiv>
      {isLoading ? (
        <Spinner />
      ) : (
        <MarketCapCardList
          key={clickedIndustryInfo.name}
          marketCapRankList={marketCapRankList}
        />
      )}
    </AreaDiv>
  )
}

export default MarketCapRankArea

const AreaDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const TitleDiv = styled.div`
  margin-left: 1rem;
  width: 100%;
  height: 1.6rem;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.6rem;
  letter-spacing: 0.1px;
`

const IndustryNameSpan = styled.span<{ nameColor: string }>`
  font-size: 1.8rem;
  color: ${({ nameColor }) => nameColor};
`
