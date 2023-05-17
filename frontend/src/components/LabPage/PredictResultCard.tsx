import { useRecoilValue } from "recoil";
import { selectedSliderList,  resultBoardSizeState } from "../../stores/LaboratoryAtoms";

import ResultStock from "./ResultStock";
import PredictKeywordCard from "./PredictKeywordCard";
import styled from "styled-components";

const PredictResultCard = () => {
  const resultBoardSize = useRecoilValue(resultBoardSizeState);

  // 사용자 입력값
  const sliderList = useRecoilValue(selectedSliderList);

  return (
    <ResultCardSection size={resultBoardSize}>
      <HeaderWrapper>
        예상 주가
        <ResultStock sliderList={sliderList} resultCardState={resultBoardSize}/>
      </HeaderWrapper>

      {resultBoardSize === "big" && (
        <>
          <InfoWrapper>오늘보다</InfoWrapper>

          <CardWrapper>
            {sliderList.map((item) => {
              return <PredictKeywordCard key={item.keyword} sliderItem={item} />;
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

const ResultCardSection = styled.div<{ size: "big" | "small" }>`
  width: ${(props) => (props.size === "big" ? "50%" : "170px")};
  height: ${(props) => (props.size === "small" ? "170px" : undefined)};
  border: 4px solid #ffffff;
  border-radius: 36px;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${(props) => (props.size === "big" ? "24px 36px" : "12px 18px")};
`;

const HeaderWrapper = styled.div`
  font-size: 2rem;
  font-weight: bold;

  display: flex;
  align-items: flex-end;
  gap: 2rem;
  flex-wrap: wrap;
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
  width: 70px;
  height: 70px;

  position: absolute;
  bottom: 0;
  right: 24px;
`;

const IconImg = styled.img`
  width: 100%;
  height: 100%;
`;
