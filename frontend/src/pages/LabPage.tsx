import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  stockAccordionOpenState,
  keywordAccordionOpenState,
} from "../stores/LaboratoryAtoms";

import StockAccordion from "../components/LabPage/StockAccordion";
import KeywordAccordion from "../components/LabPage/KeywordAccordion";
import TargetListSection from "../components/LabPage/TargetListSection";
import ResultBoard from "../components/LabPage/ResultBoard";

import Grid from "@mui/material/Grid";
import styled from "styled-components";
// import styled from "@emotion/styled";

const LabPage = () => {
  const stockOpenState = useRecoilValue(stockAccordionOpenState);
  const keywordOpenState = useRecoilValue(keywordAccordionOpenState);
  // -1 (첫 랜더링) / 1 (small) / 0 (big)
  const [resultSize, setResultSize] = useState(-1);

  useEffect(() => {
    if (resultSize < 0) {
      // 첫 랜더링인경우 바로
      setResultSize(stockOpenState || keywordOpenState ? 1 : 0);
    } else {
      setTimeout(() => {
        setResultSize(stockOpenState || keywordOpenState ? 1 : 0);
      }, 300);
    }
  }, [stockOpenState, keywordOpenState]);

  console.log("page 재렌더링!");

  // accordion 둘다 접혀져있는 경우, result panel 큰 버전 랜더링
  // wrapper 바꿔서 return 다르게 해뒀는데, 지금 하위 컴포들 랜더링 다 새로 돼버림,,, 고민,,,

  return (
    // <PageGrid container>
    //     <GridColumn item xs={10} sm={8} md={3.3}>
    //       <StockAccordion />
    //       <KeywordAccordion />
    //     </GridColumn>
    //     <GridColumn item xs={10} sm={10} md={8}>
    //       <TargetListSection />
    //     </GridColumn>
    //   <GridAbsolute resultSize={resultSize}>
    //     <ResultBoard />
    //   </GridAbsolute>
    // </PageGrid>
    <PageGrid>
      <GridColumn width={"25%"}>
        <StockAccordion />
        <KeywordAccordion />
      </GridColumn>
      <GridColumn width={"65%"}>
        <TargetListSection />
      </GridColumn>
      <GridAbsolute resultSize={resultSize}>
        <ResultBoard />
      </GridAbsolute>
    </PageGrid>
  );
};

export default LabPage;

const PageGrid = styled.div`
  width: 100%;
  padding: 62px 80px;
  display: flex;
  justify-content: space-between;
  positon: relative;
`;

const GridColumn = styled.div<{width: string}>`
  display: flex;
  flex-direction: column;

  width: ${props => props.width};
  gap: 45px;
`;

const GridAbsolute = styled.div<{ resultSize: number }>`
  position: absolute;
  right: 80px;
  top: ${(props) => (props.resultSize > 0 ? "390px" : "440px")};
  width: ${(props) => (props.resultSize > 0 ? "65%" : "100%")};
`;
