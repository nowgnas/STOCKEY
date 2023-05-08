import { useMemo } from "react";
import styled from "styled-components";

interface Props {
  sliderItem: {
    keyword: string;
    cnt: number;
  };
  baseCnt: number;
}

type changeType = "increase" | "decrease" | "noChange";

const PredictKeywordCard = ({ sliderItem, baseCnt }: Props) => {
  const changeAmount: number = useMemo(() => {
    return (sliderItem.cnt - baseCnt) / sliderItem.cnt;
  }, [sliderItem.cnt]);

  const changeState: changeType = useMemo(() => {
    if (changeAmount === 0) {
      return "noChange";
    } else if (changeAmount > 0) {
      return "increase";
    } else {
      return "decrease";
    }
  }, [sliderItem.cnt]);

  return (
    <CardWrapper>
      <HeaderWrapper>
        <KeywordSection>"{sliderItem.keyword}"</KeywordSection>
        {" "}언급
      </HeaderWrapper>

      <IconWrapper>
        {changeState !== "noChange" && (
          <IconImg
            src={
              changeState === "increase"
                ? "labImages/increaseIcon.png"
                : "labImages/decreaseIcon.png"
            }
          />
        )}
      </IconWrapper>

      <PercentWrapper changeState={changeState}>{`${Math.abs(
        changeAmount
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
  font-weight: bold;
`;

const HeaderWrapper = styled.div`
  width: 96%;
  word-break: break-all;
`;

const KeywordSection = styled.span`
  font-size: 1.4rem;
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
  color: ${(props) =>
    props.changeState === "increase"
      ? "#FB6F6F"
      : props.changeState === "decrease"
      ? "#72A6FA"
      : "null"};
`;
