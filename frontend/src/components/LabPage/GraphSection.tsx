import GraphComp from "./GraphComp";

import { GraphItem } from './SampleItems'
import styled from "styled-components";


// query data 받아와서 map 돌리기
const GraphSection = () => {

  return (
    <GraphSectionWrapper cnt={GraphItem.length}>
      {GraphItem.map((item) => (
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
