// 결과보기 btn
import { Dispatch, SetStateAction } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  selectedLabStockState,
  selectedLabKeywordListState,
  resultBoardSizeState,
} from "../../stores/LaboratoryAtoms";

import { triggerScroll } from "../common/Functions/triggerScroll";
import styled from "styled-components";

interface Props {
  isClicked: boolean;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
}

const OpenBtn = ({ isClicked, setIsClicked, refetch }: Props) => {
  // click 했을때 board size big으로 변경
  const setResultBoardSize = useSetRecoilState(resultBoardSizeState);

  // stock 있고 keyword 3개인 경우 btn active
  const selectedStock = useRecoilValue(selectedLabStockState);
  const selectedKeywodrState = useRecoilValue(selectedLabKeywordListState);
  const active = !!(selectedStock && selectedKeywodrState.length === 3);

  // 클릭하면 query 보내기
  const clickHandler = () => {
    setResultBoardSize("big");
    triggerScroll("resultBoardRef");
    if (!isClicked) {
      // clicked false인 경우 -> clicked 변경 -> query 보내짐
      setIsClicked(true);
    } else {
      // clicked true인 경우 -> refetch
      refetch();
    }
  };

  return (
    <LockBtn active={active} onClick={clickHandler} disabled={!active}>
      결과보기
    </LockBtn>
  );
};

export default OpenBtn;

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
