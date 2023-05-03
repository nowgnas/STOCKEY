import { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  selectedLabStockState,
  selectedLabKeywordListState,
  draggedLabCardState,
  stockAccordionOpenState,
  keywordAccordionOpenState,
} from "../../stores/LaboratoryAtoms";
import { useDrop } from "react-dnd";
import ResetBtn from "./ResetBtn";
import PeriodSelectBox from "./PeriodSelectBox";
import DndBox from "./DndBox";
import styled from "styled-components";

const TargetListSection = () => {
  const [stock, setStock] = useRecoilState(selectedLabStockState);
  const [keywordList, setKeywordList] = useRecoilState(
    selectedLabKeywordListState
  );
  const draggedItem = useRecoilValue(draggedLabCardState);
  const setStockAccordionOpen = useSetRecoilState(stockAccordionOpenState);
  const setKeywordAccordionOpen = useSetRecoilState(keywordAccordionOpenState);

  // drag중일때 getItem, getItemType value 가짐 -> panel active 상태 활용
  // dropRef는 drop될 부분에 선언
  const [{ getItem, getItemType }, dropRef] = useDrop(
    () => ({
      accept: ["STOCK", "KEYWORD"],
      collect: (monitor) => ({
        getItem: monitor.getItem(),
        getItemType: monitor.getItemType(),
      }),
    }),
    []
  );

  // panel active 상태 (drag중 판단)
  // 0 (default) / 1 (possible) / -1 (impossible)
  const activePanel = useMemo(() => {
    if (getItemType === "STOCK") {
      if (!stock) return 1;
      else return -1;
    } else if (getItemType === "KEYWORD") {
      if (keywordList.length < 3 && !keywordList.includes(getItem)) return 1;
      else return -1;
    } else {
      return 0;
    }
  }, [getItem]);

  console.log("section 재렌더링");
  console.log(getItem, getItemType);

  // recoil의 draggedItem 변하면 stock 또는 keywordList update 가능여부 확인 후 update
  useEffect(() => {
    console.log("changed!", draggedItem);
    if (draggedItem.type === "STOCK" && !stock) {
      // stock drop한 경우
      // recoil stock update & stock accordion close & keyword accordion open
      setStock(draggedItem.item);
      setStockAccordionOpen(false);
      setKeywordAccordionOpen(true);
    } else if (
      // keyword drop한 경우
      draggedItem.type === "KEYWORD" &&
      keywordList.length < 3 &&
      !keywordList.includes(draggedItem.item!)
    ) {
      setKeywordList((prev) => [...prev, draggedItem.item!]);
    }
  }, [draggedItem]);

  return (
    <TargetPanelLayout ref={dropRef} active={activePanel}>
      <HeaderWrapper>
        <TitleWrapper>
          분석 요소
          <SubTitleWrapper>분석 대상을 끌어서 선택하세요!</SubTitleWrapper>
        </TitleWrapper>
        <RightItemWrapper>
          <ResetBtn />
          <PeriodSelectBox />
        </RightItemWrapper>
      </HeaderWrapper>
      <ContentWrapper>
        <DndBox type={"STOCK"} item={stock} />
        <DndBox type={"KEYWORD1"} item={keywordList[0]} />
        <DndBox type={"KEYWORD2"} item={keywordList[1]} />
        <DndBox type={"KEYWORD3"} item={keywordList[2]} />
      </ContentWrapper>
    </TargetPanelLayout>
  );
};

export default TargetListSection;

const TargetPanelLayout = styled.div<{ active: number }>`
  width: 100%;
  background: ${(props) =>
    props.active === -1 ? "rgba(0, 0, 0, 0.2)" : "#ffffff"};
  border-radius: 24px;
  padding: 24px 36px;

  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.3);

  border: ${(props) =>
    props.active === -1
      ? "3px dashed #FB6F6F"
      : props.active === 1
      ? "3px dashed #4DC19F"
      : "3px solid white"};
`;

const HeaderWrapper = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const TitleWrapper = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
`;

const SubTitleWrapper = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 8px 0 18px 0;
`;

const RightItemWrapper = styled.div`
    display: flex;
    gap: 2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 2rem;
`;
