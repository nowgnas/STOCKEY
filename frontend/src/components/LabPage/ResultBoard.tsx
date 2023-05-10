import { useRecoilValue } from "recoil";
import { resultBoardOpenState } from "../../stores/LaboratoryAtoms";
import ResultBoardOpen from "./ResultBoardOpen";
import OpenBtn from "./OpenBtn";
import styled from "styled-components";

const ResultBoard = () => {
  const openState = useRecoilValue(resultBoardOpenState);

  return (
    <BoardWrapper>
      <ResultBoardOpen />
      {!openState && (
        <LockWrapper>
          <OpenBtn />
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

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(255, 254, 254, 0.9);
  border-radius: 24px;
`;
