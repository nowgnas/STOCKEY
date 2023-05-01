import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedLabStockState,
  selectedLabKeywordListState,
  draggedLabCardState,
} from "../../stores/LaboratoryAtoms";
import { useDrop } from "react-dnd";
import DndBox from "./DndBox";
import styled from "styled-components";

const TargetListSection = () => {
  const [stock, setStock] = useRecoilState(selectedLabStockState);
  const [keywordList, setKeywordList] = useRecoilState(
    selectedLabKeywordListState
  );
  const draggedItem = useRecoilValue(draggedLabCardState);

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
  const activePanel = () => {
    if (getItemType === "STOCK") {
      if (!stock) return 1;
      else return -1;
    } else if (getItemType === "KEYWORD") {
      if (keywordList.length < 3 && !keywordList.includes(getItem)) return 1;
      else return -1;
    } else {
      return 0;
    }
  };

  // recoil의 draggedItem 변하면 stock 또는 keywordList update 가능여부 확인 후 update
  useEffect(() => {
    console.log("changed!", draggedItem);
    if (draggedItem.type === "STOCK" && !stock) {
      setStock(draggedItem.item);
    } else if (
      draggedItem.type === "KEYWORD" &&
      keywordList.length < 3 &&
      !keywordList.includes(draggedItem.item!)
    ) {
      setKeywordList((prev) => [...prev, draggedItem.item!]);
    }
  }, [draggedItem]);

  return (
    <TargetPanelLayout ref={dropRef} active={activePanel()}>
      <HeaderWrapper>분석 요소</HeaderWrapper>
      <SubHeaderWrapper>분석 대상을 끌어서 선택하세요!</SubHeaderWrapper>
      <ContentWrapper>
        <DndBox type={"STOCK"} />
        <DndBox type={"KEYWORD1"} />
        <DndBox type={"KEYWORD2"} />
        <DndBox type={"KEYWORD3"} />
      </ContentWrapper>
    </TargetPanelLayout>
  );
};

export default TargetListSection;

const TargetPanelLayout = styled.div<{ active: number }>`
  width: 100%;
  background: #ffffff;
  border-radius: 24px;
  padding: 24px 36px;

  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.3);

  border: ${(props) =>
    props.active === -1
      ? "2px dashed #FB6F6F"
      : props.active === 1
      ? "2px dashed #4DC19F"
      : "2px solid white"};
`;

const HeaderWrapper = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
`;

const SubHeaderWrapper = styled.div`
  font-size: 1.5rem;
  margin: 12px 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
