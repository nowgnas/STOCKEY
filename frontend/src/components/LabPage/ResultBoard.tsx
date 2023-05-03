import styled from "styled-components";
import ResultBoardOpen from "./ResultBoardOpen";

const ResultBoard = () => { 
  
  return (
    <BoardWrapper>
      <ResultBoardOpen />
    </BoardWrapper>
  )
}

export default ResultBoard;

const BoardWrapper = styled.div`
  width: 100%;
  padding: 2% 4%;
  
  background: var(--custom-background);
  border-radius: 24px;

  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
  0px 1px 3px rgba(0, 0, 0, 0.3);
`


