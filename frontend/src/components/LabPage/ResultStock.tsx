import { useMemo } from "react";
import { Regression } from "./SampleItems";
import { GraphItemSixMonth } from "./SampleItems";
import { changeType } from "./PredictKeywordCard";
import styled from "styled-components";

interface Props {
  sliderList: { keyword: string; cnt: number }[];
  resultCardState: "big" | "small";
}

const ResultStock = ({ sliderList, resultCardState }: Props) => {
  // 결과 계산
  let result = Regression.constant;
  Regression.coefficients.map(({ keyword, coefficient }) => {
    sliderList.forEach((item) => {
      if (item.keyword === keyword) {
        result += coefficient * item.cnt;
        return false;
      }
    });
  });

  // 등락 계산
  // query에서 graph 마지막 주가 가져오기
  const baseStock: number = useMemo(() => {
    const scatterList = GraphItemSixMonth[0].scatter;
    console.log(scatterList);
    return scatterList[scatterList.length - 1][1];
  }, []);
  console.log('base: ', baseStock);


  const changeAmount = result - baseStock;
  const changePercent = changeAmount / baseStock;
  const changeState: changeType =
    changeAmount === 0
      ? "noChange"
      : changeAmount > 0
      ? "increase"
      : "decrease";

  return (
    <ResultStockWrapper>
      {/* 예상 주가 */}
      <ResultWrapper>
        <Result>
          {result.toLocaleString("ko-KR", {
            maximumFractionDigits: 0,
          })}
        </Result>
        원  
      </ResultWrapper>
      
      {/* 등락 */}
      <ResultStateWrapper changeState={changeState}>
        <IconWrapper>
          {changeState === "noChange"
            ? ""
            : changeState === "increase"
            ? "▲"
            : "▼"}
        </IconWrapper>

        {resultCardState === "big" && (
          <>
            {Math.abs(changeAmount).toLocaleString("ko-KR", {
              maximumFractionDigits: 0,
            })}
            원 (
            {changePercent > 0
              ? `+${changePercent.toFixed(2)}`
              : changePercent.toFixed(2)}
            %)
          </>
        )}
      </ResultStateWrapper>
    </ResultStockWrapper>
  );
};

export default ResultStock;

const ResultStockWrapper = styled.div`
  color: var(--custom-mint);
  display: flex;
  align-items: center;
`;

const ResultWrapper = styled.span`
  word-break: break-all;
`;

const Result = styled.span`
  font-size: 2.6rem;
`

const ResultStateWrapper = styled.div<{ changeState: changeType }>`
  font-size: 1.5rem;
  color: ${(props) =>
    props.changeState === "increase"
      ? "var(--custom-increase-red)"
      : props.changeState === "decrease"
      ? "var(--custom-decrease-blue)"
      : "var(--custom-gray-1)"};
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const IconWrapper = styled.div`
  font-size: 1.2rem;
  margin: 0 0.5rem 0 1rem;
`;
