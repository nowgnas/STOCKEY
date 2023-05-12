import { useMemo } from "react";
import { GraphItemSixMonth } from "./SampleItems";
import styled from "styled-components";

interface Props {
  sliderItem: {
    keyword: string;
    cnt: number;
  };
}

export type changeType = "increase" | "decrease" | "noChange";

const PredictKeywordCard = ({ sliderItem }: Props) => {
  
  // query에서 graph 마지막 keyword 빈도 가져오기
  const baseCnt: number = useMemo(() => {
    // console.log('이거 계산 다시?')
    let baseCnt = 0;
    GraphItemSixMonth.forEach(({ keyword, scatter }) => {
      if (keyword === sliderItem.keyword) {
        baseCnt = Math.round(scatter[scatter.length - 1][0]);
        return false;
      }
    });
    return baseCnt;
  }, []);

  // console.log('여기 다시?', sliderItem.keyword)

  const changePercent: number = useMemo(() => {
    return (sliderItem.cnt - baseCnt) / baseCnt;
  }, [sliderItem.cnt]);

  const changeState: changeType = useMemo(() => {
    if (changePercent === 0) {
      return "noChange";
    } else if (changePercent > 0) {
      return "increase";
    } else {
      return "decrease";
    }
  }, [sliderItem.cnt]);

  return (
    <CardWrapper>
      <HeaderWrapper>
        <KeywordSection>"{sliderItem.keyword}"</KeywordSection> 언급
      </HeaderWrapper>

      <IconWrapper>
        <IconImg
          src={
            changeState === "noChange"
              ? "labImages/noChangeIcon.png"
              : changeState === "increase"
              ? "labImages/increaseIcon.png"
              : "labImages/decreaseIcon.png"
          }
        />
      </IconWrapper>

      <PercentWrapper changeState={changeState}>{`${Math.abs(
        changePercent
      ).toFixed(2)}%`}</PercentWrapper>
    </CardWrapper>
  );
};

export default PredictKeywordCard;

const CardWrapper = styled.div`
  width: 120px;
  height: 120px;
  background: #ffffff;
  border-radius: 12px;
  padding: 2%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 1.2rem;
  z-index: 1;
`;

const HeaderWrapper = styled.div`
  width: 96%;
  word-break: break-all;
`;

const KeywordSection = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  margin: 4px;
`;

const IconImg = styled.img`
  width: 100%;
  height: 100%;
`;

const PercentWrapper = styled.div<{ changeState: changeType }>`
  font-weight: bold;
  color: ${(props) =>
    props.changeState === "increase"
      ? "var(--custom-increase-red)"
      : props.changeState === "decrease"
      ? "var(--custom-decrease-blue)"
      : "var(--custom-gray-1)"};
`;
