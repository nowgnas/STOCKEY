import { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  resultBoardOpenState,
  selectedLabStockState,
  selectedLabKeywordListState,
  selectedSliderList
  // selectedLabPeriodState,
} from "../../stores/LaboratoryAtoms";
import { useLabResult } from "../../hooks/useLabAccordion";
import ResultBoardOpen from "./ResultBoardOpen";
import OpenBtn from "./OpenBtn";
import LoadingComponent from "../common/Loading/LoadingComponent";
import styled from "styled-components";

const ResultBoard = () => {
  // result board open state
  const [openState, setOpenState] = useRecoilState(resultBoardOpenState);

  // result board open btn click state
  const [isClicked, setIsClicked] = useState(false);

  // back에 담아 보낼 data
  const selectedStock = useRecoilValue(selectedLabStockState);
  const selectedKeywodList = useRecoilValue(selectedLabKeywordListState);
  // const selectedPeriod = useRecoilValue(selectedLabPeriodState);

  // result data query
  const { data, isLoading, refetch } = useLabResult(
    selectedStock,
    selectedKeywodList,
    // selectedPeriod,
    isClicked
  );

  // data 들어오면 recoil slider 변경 후 result board state open으로 변경
  const setSliderList = useSetRecoilState(selectedSliderList);
  useEffect(() => {
    if (data) {
      const cntArr = data.graphData.map((item: any) => {
        return {
          keyword: item.keyword,
          cnt: Math.round(item.lastDate.x)
        };
      });
      setSliderList(cntArr);
      setOpenState(true);
    }
  }, [data]);


  return (
    <BoardWrapper id="resultBoardRef">
      <ResultBoardOpen
        stock={selectedStock}
        keywordList={selectedKeywodList}
        graphData={data && data.graphData ? data.graphData : []}
        constant={data && data.constant ? data.constant : 0}
        regressionData={data && data.regressionData ? data.regressionData : []}
      />
      {!openState && (
        <LockWrapper>
          {isLoading ? (
            <LoadingComponent top={0} />
          ) : (
            <OpenBtn
              isClicked={isClicked}
              setIsClicked={setIsClicked}
              refetch={refetch}
            />
          )}
        </LockWrapper>
      )}
    </BoardWrapper>
  );
};

export default ResultBoard;

const BoardWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 3% 4%;

  background: var(--custom-background);
  border-radius: 24px;

  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.3);
`;

const LockWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  display: flex;
  justify-content: center;
  padding-top: 300px;

  background: rgba(255, 254, 254, 0.9);
  border-radius: 24px;
`;
