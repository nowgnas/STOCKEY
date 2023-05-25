import { useRecoilValue } from "recoil";
import { resultBoardSizeState } from "../stores/LaboratoryAtoms";
import { resultBoardSizeType } from "../components/LabPage/LabType";

import StockAccordion from "../components/LabPage/StockAccordion";
import KeywordAccordion from "../components/LabPage/KeywordAccordion";
import TargetListSection from "../components/LabPage/TargetListSection";
import ResultBoard from "../components/LabPage/ResultBoard";
import { CustomDragLayer } from "../components/common/DragDrop/CustomDragLayer";

import styled from "styled-components";

const LabPage = () => {
  // accordion 둘다 접혀져있는 경우, result panel 큰 버전 랜더링
  const resultBoardSize = useRecoilValue(resultBoardSizeState);

  return (
    <PageWrapper>
      <ColumnWrapper width={"30%"}>
        <StockAccordion />
        <KeywordAccordion />
      </ColumnWrapper>

      <ColumnWrapper width={"65%"}>
        <TargetListSection />
      </ColumnWrapper>

      <AbsoluteWrapper resultBoardSize={resultBoardSize}>
        <ResultBoard />
      </AbsoluteWrapper>
      
      <CustomDragLayer />
    </PageWrapper>
  );
};

export default LabPage;

const PageWrapper = styled.div`
  padding: 4% 8%;
  positon: relative;

  display: flex;
  justify-content: space-between;
`;

const ColumnWrapper = styled.div<{width: string}>`
  display: flex;
  flex-direction: column;

  width: ${props => props.width};
  gap: 45px;
`;

const AbsoluteWrapper = styled.div<{ resultBoardSize: resultBoardSizeType }>`
  position: absolute;
  padding: 0 0 5% 0;
  right: 8%;
  top: ${(props) => (props.resultBoardSize === "small" ? "390px" : "440px")};
  width: ${(props) => (props.resultBoardSize === "small" ? "54.6%" : "84%")};

  -webkit-transition: width 1s, top 1s;
  transition: width 1s, top 1s;
`;