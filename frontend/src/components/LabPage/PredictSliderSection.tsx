import { useRecoilState, useRecoilValue } from "recoil";
import { resultBoardSizeState, selectedSliderList } from "../../stores/LaboratoryAtoms";
import { resultBoardSizeType } from "./LabType";

import PredictSlider from "./PredictSlider";
import styled from "styled-components";

interface Props {
  keywordList: any[]
}

const PredictSliderSection = ({keywordList}: Props) => {
  // keywordList 없는 경우 dummy data (skeleton 띄우기)
  const keywordData = keywordList.length > 0 ? keywordList : [{id: 0, name: ""}]
  const [sliderList, setSliderList] = useRecoilState(selectedSliderList);
  const resultBoardSize = useRecoilValue(resultBoardSizeState);
  
  // keyword에 맞는 slider item
  const getSliderItem = (keyword: string) => {
    let sliderItem = {keyword: keyword, cnt: 0};
    if (sliderList.length > 0) {
      sliderList.forEach((item) => {
        if (keyword === item.keyword) {
          sliderItem = item
          return false;
        }
    })}
    return sliderItem;
  }

  return (
    <SectionWrapper resultBoardSize={resultBoardSize}>
      {keywordData.map((item, index) => {
        return <PredictSlider key={index} index={index} item={getSliderItem(item.name)} setSliderList={setSliderList} />;
      })}
    </SectionWrapper>
  );
};

export default PredictSliderSection;

const SectionWrapper = styled.div<{ resultBoardSize: resultBoardSizeType }>`
  width: ${(props) => (props.resultBoardSize === "big" ? "45%" : "70%")};
  height: 200px;
  margin: 18px 0 0 0;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 24px;
`;