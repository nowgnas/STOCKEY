import { useMemo } from "react";
import { LabGraphType, LabRegressionType } from "./LabType";
import { resultBoardSizeType, ChangeType } from "./LabType";
import styled from "styled-components";

interface Props {
  sliderList: { keyword: string; cnt: number }[];
  graphData: LabGraphType[];
  constant: number;
  regressionData: LabRegressionType[];
  resultCardState: resultBoardSizeType;
}

const ResultStock = ({ sliderList, graphData, constant, regressionData, resultCardState }: Props) => {
  // 결과 계산
  let result = constant;
  regressionData.map(({ keyword, coefficient }) => {
    sliderList.forEach((item) => {
      if (item.keyword === keyword) {
        result += coefficient * item.cnt;
        return false;
      }
    });
  });

  // 등락 계산 base
  const baseStock: number = useMemo(() => {
    if (graphData.length > 0) {
      return graphData[0].lastDate.y;
    } else {
      return 0;
    }
  }, [graphData]);

  // 등락 계산
  const changeAmount = baseStock > 0 ? result - baseStock : 0;
  const changePercent = baseStock > 0 ? changeAmount / baseStock : 0;
  const changeState: ChangeType =
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

const ResultStateWrapper = styled.div<{ changeState: ChangeType }>`
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
