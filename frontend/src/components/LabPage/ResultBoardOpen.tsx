import { StockCardType } from "./LabType";
import GraphSection from "./GraphSection";
import PredictSection from "./PredictSection";
import { LabGraphType, LabRegressionType } from "./LabType";
import ZoomBtn from "./ZoomBtn";
import styled from "styled-components";

interface Props {
  stock: StockCardType | undefined
  keywordList: any[]
  graphData: LabGraphType[]
  constant: number
  regressionData: LabRegressionType[]
}

const ResultBoardOpen = ({stock, keywordList, graphData, constant, regressionData} : Props) => {
  const stockName = `${stock ? stock.name : "종목"}`;
  const uni = stockName[stockName.length - 1].charCodeAt(0);
  const text =
    uni >= 44032 && uni <= 55203 && (uni - 44032) % 28 !== 0 ? "과" : "와";

  return (
    <BoardWrapper>
      <HeaderWrapper>
        <StockNameSection>{stockName}</StockNameSection>
        {text} 키워드간 관계는 어떤가요?
      </HeaderWrapper>
      <InfoWrapper>
        <InfoSpan>
          각 숫자는 키워드의 출연 빈도가 주가에 미치는 영향력을 나타내요.
        </InfoSpan>
        <InfoSpan>+ 는 비례, - 는 반비례할 가능성이 높아요!</InfoSpan>
      </InfoWrapper>

      {/* graph */}
      <GraphSection keywordList={keywordList} graphData={graphData} regressionData={regressionData}/>

      <HeaderWrapper>키워드를 조정하여 주가를 예측해보세요!</HeaderWrapper>

      {/* predict */}
      <PredictSection keywordList={keywordList} graphData={graphData} constant={constant} regressionData={regressionData}/>

      {/* zoom btn */}
      <ZoomBtn />

    </BoardWrapper>
  );
};

export default ResultBoardOpen;

const BoardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HeaderWrapper = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const StockNameSection = styled.span`
  font-size: 2.4rem;
  margin: 4px;
  color: var(--custom-mint);
`;

const InfoWrapper = styled.div`
  font-size: 1.6rem;
  color: var(--custom-gray-2);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const InfoSpan = styled.span``;
