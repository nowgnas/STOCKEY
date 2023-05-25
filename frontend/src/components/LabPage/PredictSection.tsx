import PredictSliderSection from "./PredictSliderSection";
import PredictResultCard from "./PredictResultCard";
import { LabGraphType, LabRegressionType } from "./LabType";

import styled from "styled-components";

interface Props {
  keywordList: any[];
  graphData: LabGraphType[];
  constant: number;
  regressionData: LabRegressionType[];
}

const PredictSection = ({keywordList, graphData, constant, regressionData}: Props) => {
  return (
    <SectionWrapper>
      <PredictSliderSection keywordList={keywordList}/>
      <PredictResultCard keywordList={keywordList} graphData={graphData} constant={constant} regressionData={regressionData}/>
    </SectionWrapper>
  );
};

export default PredictSection;

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
