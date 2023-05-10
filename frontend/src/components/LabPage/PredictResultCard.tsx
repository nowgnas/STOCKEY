import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { selectedSliderList } from "../../stores/LaboratoryAtoms";

import { lastCnt, Regression } from "./SampleItems";
import styled from "styled-components";
import PredictKeywordCard from "./PredictKeywordCard";

const PredictResultCard = () => {
  // 데이터 목록
  // 1. 결과 돈
  // 1.1 회기계수 + 상수 (query)
  // 1.2 사용자 입력값 (query -> recoil)

  // 2. keyword card
  // 2.1 keyword default (query)
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

  // 2.1 keyword default값
  const baseCntCalc = (item: { keyword: string; cnt: number }) => {
    let base = 0;
    lastCnt.forEach(({ keyword, cnt }) => {
      if (keyword === item.keyword) {
        base = cnt;
        return false;
      }
    });
    return base;
  };

  return (
    <ResultCardSection>
      <HeaderWrapper>
        예상 주가
        <ResultWrapper>
          {calcResult.toLocaleString("ko-KR", {
            maximumFractionDigits: 4,
          })}
          원
        </ResultWrapper>
      </HeaderWrapper>

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
    </ResultCardSection>
  );
};

export default PredictResultCard;

const ResultCardSection = styled.div`
  width: 600px;
  border: 4px solid #ffffff;
  border-radius: 36px;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 36px;
`;

const HeaderWrapper = styled.div`
  font-size: 2rem;
  font-weight: bold;

  display: flex;
  align-items: flex-end;
  gap: 2rem;
`;

const ResultWrapper = styled.div`
  font-size: 2.4rem;
  color: var(--custom-mint);
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
