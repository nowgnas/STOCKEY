import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedSliderList } from "../../stores/LaboratoryAtoms";

import PredictSlider from "./PredictSlider";
import { GraphItemSixMonth } from "./SampleItems";
import styled from "styled-components";

const PredictSliderSection = () => {
  const [sliderList, setSliderList] = useRecoilState(selectedSliderList);
  
  // 처음 랜더링될때, query에서 데이터 받아와서 recoil default 데이터 갱신
  // 이렇게하면 다른페이지 갔다 왔을때 데이터 안남아있음 -> query 받아오자마자 갱신시키도록 수정해야할듯
  useEffect(() => {
    console.log("slider default 바꿀거임!");

    const cntArr = GraphItemSixMonth.map((item) => {
      return {
        keyword: item.keyword,
        cnt: Math.round(item.scatter[item.scatter.length - 1][0])
      };
    });
    setSliderList(cntArr);
  }, []);
  if (!sliderList) return <></>;

  return (
    <SectionWrapper>
      {sliderList.map((item, index) => {
        return <PredictSlider item={item} index={index} setSliderList={setSliderList} />;
      })}
    </SectionWrapper>
  );
};

export default PredictSliderSection;

const SectionWrapper = styled.div`
  width: 500px;
  margin: 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 24px;
`;
