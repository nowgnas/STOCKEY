import GraphComp from "./GraphComp";

import { GraphItemOneMonth, GraphItemSixMonth, Regression } from './SampleItems'
import styled from "styled-components";


// graph query data 받아와서 map 돌리기
const GraphSection = () => {
  
  // graphComp에 맞는 coefficient 보내기
  // coefficient: query 데이터
  const getCoefficient = (keyword: string) => {
    let coefficient = 0;
    Regression.coefficients.forEach((item) => {
      if (keyword === item.keyword) {
        coefficient = item.coefficient
        return false;
      }
    })
    return coefficient;
  }

  return (
    <GraphSectionWrapper cnt={GraphItemSixMonth.length}>
      {GraphItemSixMonth.map((item, index) => (
        <GraphComp item={item} index={index} coefficient={getCoefficient(item.keyword)}/>
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
