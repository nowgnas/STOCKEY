// 결과보기 btn
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  selectedLabStockState,
  selectedLabKeywordListState,
  resultBoardOpenState
} from "../../stores/LaboratoryAtoms";

import styled from "styled-components";

const OpenBtn = () => {
  const selectedStock = useRecoilValue(selectedLabStockState);
  const selectedKeywodrState = useRecoilValue(selectedLabKeywordListState);
  const setResultBoardOpen = useSetRecoilState(resultBoardOpenState);
  const active = !!(selectedStock && selectedKeywodrState.length > 0);

  const clickHandler = () => {
    // result data 받아오는 query 보내기
    // loading 중에는 spinner loading 끝나면 openstate 변경
    // 임시로 settimeout
    setTimeout(() => {
      setResultBoardOpen(true);
    }, 300)
  };

  return (
    <LockBtnWrapper active={active} onClick={clickHandler} disabled={!active}>
      결과보기
    </LockBtnWrapper>
  );
};

export default OpenBtn;

const LockBtnWrapper = styled.button<{ active: boolean }>`
  width: 30%;
  height: 80px;
  margin-bottom: 20%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 36px;
  
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  
  background: ${props => props.active ? "#f391a3" : "var(--custom-gray-2)"};
  cursor: ${props => props.active ? "pointer" : "default"};
`;
