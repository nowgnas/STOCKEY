// 결과보기 btn
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  selectedLabStockState,
  selectedLabKeywordListState,
  resultBoardSizeState,
  resultBoardOpenState,
} from "../../stores/LaboratoryAtoms";
import {
  useLabResultGraph,
  useLabResultRegression,
} from "../../hooks/useLabAccordion";
import { triggerScroll } from "../common/Functions/triggerScroll";
import LoadingComponent from "../common/Loading/LoadingComponent";
import styled from "styled-components";

const OpenBtn = () => {
  const selectedStock = useRecoilValue(selectedLabStockState);
  const selectedKeywodrState = useRecoilValue(selectedLabKeywordListState);
  const setResultBoardSize = useSetRecoilState(resultBoardSizeState);
  const setResultBoardOpen = useSetRecoilState(resultBoardOpenState);
  const active = !!(selectedStock && selectedKeywodrState.length > 0);
  const [isClicked, setIsClicked] = useState(false);

  // graph data query
  const {
    data: graphData,
    isLoading: graphLoading,
    refetch: graphRefetch,
    isError: graphError,
  } = useLabResultGraph(selectedStock, selectedKeywodrState, isClicked);

  // 회귀분석 data query
  const {
    data: regressionData,
    isLoading: regressionLoading,
    refetch: regressionRefetch,
    isError: regressionError,
  } = useLabResultRegression(selectedStock, selectedKeywodrState, isClicked);

  if (!graphLoading && !regressionLoading && (graphError || regressionError)) {
    alert("잠시후 다시 시도해주세요.");
  }

  // 클릭하면 query 보내기
  const clickHandler = () => {
    setResultBoardSize("big");
    triggerScroll("resultBoardRef");
    if (!isClicked) {
      // clicked false인 경우 -> clicked 변경 -> query 보내짐
      setIsClicked(true);
    } else {
      // clicked true인 경우 (error난 경우) -> refetch
      graphRefetch();
      regressionRefetch();
    }
  };

  // graph data 들어오면 recoil에 graph 마지막 default 값 변경
  useEffect(() => {

  }, [graphData]);

  // graph data + query data 둘다 들어오면 result board state open으로 변경
  useEffect(() => {
    
  }, [graphData, regressionData]);

  return (
    <BtnWrapper>
      {graphLoading || regressionLoading ? (
        <LoadingComponent top={0} />
      ) : (
        <LockBtn active={active} onClick={clickHandler} disabled={!active}>
          결과보기
        </LockBtn>
      )}
    </BtnWrapper>
  );
};

export default OpenBtn;

const BtnWrapper = styled.div`
  width: 100%;
  margin-top: 300px;

  display: flex;
  justify-content: center;
`;

const LockBtn = styled.button<{ active: boolean }>`
  background: ${(props) => (props.active ? "#f391a3" : "var(--custom-gray-2)")};
  cursor: ${(props) => (props.active ? "pointer" : "default")};
  width: 30%;
  height: 80px;
  border: none;
  border-radius: 36px;
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
`;
