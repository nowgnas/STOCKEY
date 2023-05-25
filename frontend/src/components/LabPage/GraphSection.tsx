import GraphComp from "./GraphComp";
import { LabGraphType, LabRegressionType } from "./LabType";
import styled from "styled-components";

interface Props {
  keywordList: any[];
  graphData: LabGraphType[];
  regressionData: LabRegressionType[];
}

const GraphSection = ({ keywordList, graphData, regressionData }: Props) => {
  // keywordList 없는 경우 dummy data (graph 띄우기)
  const keywordData = keywordList.length > 0 ? keywordList : [{ id: 0, name: "" }];

  // keyword에 맞는 graph data
  const getGraphItem = (keyword: string) => {
    let graphItem = {
      keyword: keyword,
      lastDate: { x: 0, y: 0 },
      line: [{ x: 0, y: 0 }],
      scatter: [{ x: 0, y: 0 }],
    };
    if (graphData) {
      graphData.forEach((item) => {
        if (keyword === item.keyword) {
          graphItem = item;
          return false;
        }
      });
    }
    return graphItem;
  };

  // keyword에 맞는 coefficient
  const getCoefficient = (keyword: string) => {
    let coefficient = 0;
    if (regressionData) {
      regressionData.forEach((item) => {
        if (keyword === item.keyword) {
          coefficient = item.coefficient;
          return false;
        }
      });
    }
    return coefficient;
  };

  return (
    <GraphSectionWrapper cnt={keywordList.length}>
      {keywordData.map((item, index) => (
        <GraphComp
          key={index}
          index={index}
          item={getGraphItem(item.name)}
          coefficient={getCoefficient(item.name)}
        />
      ))}
    </GraphSectionWrapper>
  );
};

export default GraphSection;

const GraphSectionWrapper = styled.div<{ cnt: number }>`
  width: 100%;
  display: flex;
  justify-content: ${(props) =>
    props.cnt === 3 ? "space-between" : "flex-start"};
  gap: ${(props) => (props.cnt === 3 ? null : "8%")};
  margin: 12px 0;
`;
