import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { resultBoardSizeState } from "../../stores/LaboratoryAtoms";
import { selectedSliderList } from "../../stores/LaboratoryAtoms";

import { GraphItemSixMonth, Regression } from "./SampleItems";
import styled from "styled-components";
import PredictKeywordCard from "./PredictKeywordCard";

const PredictResultCard = () => {
  const resultBoardSize = useRecoilValue(resultBoardSizeState);

  // 데이터 목록
  // 1. 결과 돈
  // 1.1 회기계수 + 상수 (query)
  // 1.2 사용자 입력값 (query -> recoil)

  // 2. keyword card
  // 2.1 graph 마지막 값 (query)
  // 2.2 사용자 입력값 (query -> recoil)

  // 사용자 입력값
  const sliderList = useRecoilValue(selectedSliderList);

  // 1. 결과 계산
  const calcResult = useMemo(() => {
    let result = Regression.constant;

    Regression.coefficients.map(({ keyword, coefficient }) => {
      sliderList.forEach((item) => {
        if (item.keyword === keyword) {
          result += coefficient * item.cnt;
          return false;
        }
      });
    });
    return result;
  }, [Regression, sliderList]);

  // 2. keyword 변화량 게산
  const baseCntCalc = (item: { keyword: string; cnt: number }) => {
    let base = 0;
    GraphItemSixMonth.forEach(({ keyword, scatter }) => {
      if (keyword === item.keyword) {
        base = Math.round(scatter[scatter.length - 1][0]);
        return false;
      }
    });
    return base;
  };

  return (
    <ResultCardSection size={resultBoardSize}>
      <HeaderWrapper>
        예상 주가
        <ResultWrapper size={resultBoardSize}>
          {calcResult.toLocaleString("ko-KR", {
            maximumFractionDigits: 0,
          })}
          원
        </ResultWrapper>
      </HeaderWrapper>
      
      {resultBoardSize === "big" && (
        <>
          <InfoWrapper>오늘보다</InfoWrapper>

          <CardWrapper>
            {sliderList.map((item) => {
              return (
                <PredictKeywordCard sliderItem={item} baseCnt={baseCntCalc(item)} />
              );
            })}
          </CardWrapper>

          <IconWrapper>
            <IconImg src={"labImages/robotIcon.png"} alt="" />
          </IconWrapper>
        </>
      )}

    </ResultCardSection>


  );
};

export default PredictResultCard;

const ResultCardSection = styled.div<{size: "big" | "small"}>`
  width: ${props => props.size === "big" ? "600px" : "180px"};
  height: ${props => props.size === "small" ? "180px" : undefined};
  border: 4px solid #ffffff;
  border-radius: 36px;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${props => props.size === "big" ? "24px 36px" : "12px 18px"};
`;

const HeaderWrapper = styled.div`
  font-size: 2rem;
  font-weight: bold;

  display: flex;
  align-items: flex-end;
  gap: 2rem;
  flex-wrap: wrap;
`;

const ResultWrapper = styled.div<{size: "big" | "small"}>`
  font-size: ${props => props.size === "big" ? "2.4rem" : "2rem"};
  color: var(--custom-mint);
  word-break: break-all;
`;

const InfoWrapper = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--custom-gray-1);
  margin: 1.5rem 0 0.5rem 0;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 2.4rem;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;

  position: absolute;
  bottom: 0;
  right: 36px;
`;

const IconImg = styled.img`
  width: 100%;
  height: 100%;
`;
