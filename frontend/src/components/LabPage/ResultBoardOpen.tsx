import React from "react";
import { useRecoilValue } from "recoil";
import { selectedLabStockState } from "../../stores/LaboratoryAtoms";
import GraphSection from "./GraphSection";
import PredictSection from "./PredictSection";
import styled from "styled-components";

const ResultBoardOpen = () => {
  const selectedStock = useRecoilValue(selectedLabStockState);
  const stockName = `${selectedStock ? selectedStock.name : "종목"}`;
  const uni = stockName[stockName.length - 1].charCodeAt(0);
  const text =
    uni >= 44032 && uni <= 55203 && (uni - 44032) % 28 != 0 ? "과" : "와";

  return (
    <BoardWrapper>
      <HeaderWrapper>
        <StockNameSection>{stockName}</StockNameSection>
        {text} 키워드간 관계는 어떤가요?
      </HeaderWrapper>
      <InfoWrapper>
        회귀분석 결과 어쩌구 저쩌구,, 마이너스는 음의 관계 플러스는 양의 관계!
      </InfoWrapper>
      <GraphSection />
      <HeaderWrapper>
        키워드를 조정하여 주가를 예측해보세요!
      </HeaderWrapper>
      <InfoWrapper>
        예측 어쩌구 저쩌구,,,,
      </InfoWrapper>
      <PredictSection />
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
`;

const StockNameSection = styled.span`
  font-size: 2.2rem;
  margin: 4px;
  color: var(--custom-mint);
`;

const InfoWrapper = styled.div`
  font-size: 1.4rem;
  color: var(--custom-gray-2);
`;
