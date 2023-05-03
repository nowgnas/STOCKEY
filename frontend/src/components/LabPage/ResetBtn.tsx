import { memo } from "react";
import { useResetRecoilState } from "recoil";
import {
  selectedLabStockState,
  selectedLabKeywordListState,
  draggedLabCardState,
  selectedLabPeriodState,
  stockAccordionOpenState,
  keywordAccordionOpenState
} from "../../stores/LaboratoryAtoms";

import styled from "styled-components";

const ResetBtn = () => {
  const resetSelectedLabStockState = useResetRecoilState(selectedLabStockState);
  const resetSelectedLabKeywordListState = useResetRecoilState(selectedLabKeywordListState);
  const resetDraggedLabCardState = useResetRecoilState(draggedLabCardState);
  const resetSelectedLabPeriodState = useResetRecoilState(selectedLabPeriodState);
  const resetStockAccordionOpenState = useResetRecoilState(stockAccordionOpenState);
  const resetKeywordAccordionOpenState = useResetRecoilState(keywordAccordionOpenState);

  const resetHandler = () => {
    console.log("reset all!");
    resetSelectedLabStockState();
    resetSelectedLabKeywordListState();
    resetDraggedLabCardState();
    resetSelectedLabPeriodState();
    resetStockAccordionOpenState();
    resetKeywordAccordionOpenState();
  };
  
  return <ResetBtnWrapper onClick={resetHandler}>초기화</ResetBtnWrapper>;
};

export default memo(ResetBtn);

const ResetBtnWrapper = styled.button`
  font-size: 1.2rem;
  min-width: 10px;
  height: 40px;
  overflow: hidden;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #C4C4C4;
  color: var(--custom-gray-1);
  background-color: white;
  cursor: pointer;

  &: hover{
    color: #FB6F6F;
    border: 1px solid #FB6F6F;
    background-color: var(--custom-gray-4);
  }
`;
