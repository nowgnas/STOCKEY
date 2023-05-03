import React from "react";
import GraphComp from "./GraphComp";
import styled from "styled-components";
// import {useRecoilValue} from 'recoil';
// import { selectedLabKeywordListState } from "../../stores/LaboratoryAtoms";

const sampelItem = [
  {

  }, 
  {

  }, 
  {

  }
];

// query data 받아와서 map 돌리기
const GraphSection = () => {
  // const keywordList = useRecoilValue(selectedLabKeywordListState);

  return (
    <GraphSectionWrapper cnt={sampelItem.length}>
      {sampelItem.map((item) => (
        <GraphComp item={item} />
      ))}
    </GraphSectionWrapper>
  );
};

export default GraphSection;

const GraphSectionWrapper = styled.div<{cnt: number}>`
  width: 100%;
  display: flex;
  justify-content: ${props => props.cnt === 3 ? "space-between" : "flex-start"};
  gap: ${props => props.cnt === 3 ? null : "8%"};
  margin: 12px 0;
`;
