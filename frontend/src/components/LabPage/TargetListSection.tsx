import { memo } from "react";
import { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  selectedLabStockState,
  selectedLabKeywordListState,
  draggedLabCardState,
  stockAccordionOpenState,
  keywordAccordionOpenState,
  resultBoardOpenState,
} from "../../stores/LaboratoryAtoms";
import { useDrop } from "react-dnd";
import ResetBtn from "./ResetBtn";
import PeriodSelectBox from "./PeriodSelectBox";
import DndBox from "./DndBox";
import styled from "styled-components";

type panelState = "possible" | "impossible" | "nonActive";

const TargetListSection = () => {
  const [stock, setStock] = useRecoilState(selectedLabStockState);
  const [keywordList, setKeywordList] = useRecoilState(selectedLabKeywordListState);
  const draggedItem = useRecoilValue(draggedLabCardState);
  const setStockAccordionOpen = useSetRecoilState(stockAccordionOpenState);
  const setKeywordAccordionOpen = useSetRecoilState(keywordAccordionOpenState);
  const setResultBoardOpen = useSetRecoilState(resultBoardOpenState);

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
  const activePanel: panelState = useMemo(() => {
    if (getItemType === "STOCK") {
      if (!stock) return "possible";
      else return "impossible";
    } else if (getItemType === "KEYWORD") {
      if (keywordList.length < 3 && !keywordList.includes(getItem))
        return "possible";
      else return "impossible";
    } else {
      return "nonActive";
    }
  }, [getItem]);

  // recoil의 draggedItem 변하면 stock 또는 keywordList update 가능여부 확인 후 update
  useEffect(() => {
    if (draggedItem.type === "STOCK" && !stock) {
      // stock drop한 경우
      // recoil stock update & stock accordion close & keyword accordion open & resultboard lock
      setStock(draggedItem.item);
      setStockAccordionOpen(false);
      setKeywordAccordionOpen(true);
      setResultBoardOpen(false);      
    } else if (
      // keyword drop한 경우
      draggedItem.type === "KEYWORD" &&
      keywordList.length < 3 &&
      !keywordList.includes(draggedItem.item!)
    ) {
      setKeywordList((prev) => [...prev, draggedItem.item!]);
      setResultBoardOpen(false);
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

      {activePanel === "impossible" && <ImpossiblePanel />}
    </TargetPanelLayout>
  );
};

export default memo(TargetListSection);

const TargetPanelLayout = styled.div<{ active: panelState }>`
  width: 100%;
  border-radius: 24px;
  padding: 30px 36px;
  position: relative;

  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.3);

  border: ${(props) =>
    props.active === "impossible"
      ? "3px dashed #FB6F6F"
      : props.active === "possible"
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
  margin: 10px 0 20px 0;
`;

const RightItemWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;

  padding: 4px 0 8px 0;
  height: 140px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 1.8rem;
  }
  ::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 24px;
    border: 5px solid transparent;
    background-clip: padding-box;
  }
  ::-webkit-scrollbar-track {
    width: 1.8rem;
  }
`;

const ImpossiblePanel = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 24px;
  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.2);
`;
