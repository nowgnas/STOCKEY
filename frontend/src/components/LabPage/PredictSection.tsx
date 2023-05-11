import PredictSliderSection from "./PredictSliderSection";
import PredictResultCard from "./PredictResultCard";

import styled from "styled-components";

const PredictSection = () => {
  return (
    <SectionWrapper>
      <PredictSliderSection />
      <PredictResultCard />
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
