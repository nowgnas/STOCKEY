import DndCard from "./DndCard";
import styled from "styled-components";

const sampleItem = [
  {
    id: 1,
    name: "BGF리테일",
  },
  {
    id: 2,
    name: "CJ제일제당",
  },
  {
    id: 3,
    name: "DB손해보험",
  },
  {
    id: 4,
    name: "F&F",
  },
  {
    id: 5,
    name: "HD현대",
  },
  {
    id: 6,
    name: "HMM",
  },
  {
    id: 7,
    name: "KB금융",
  },
  {
    id: 8,
    name: "KT&G",
  },
];

const StockAccordion = () => {
    
  return (
    <PanelLayout>
      <HeaderWrapper>종목</HeaderWrapper>
      <ContentWrapper>
        {sampleItem.map((item) => {
          return (
            <DndCard
              key={item.id}
              item={item}
              type="STOCK"
            />
          );
        })}
      </ContentWrapper>
    </PanelLayout>
  );
};

export default StockAccordion;

export const PanelLayout = styled.div`
  width: 100%;
  background: #f8f8f8;
  border-radius: 24px;

  padding: 18px 0px;

  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.3);
`;

export const HeaderWrapper = styled.div`
  padding: 0 30px 24px 30px;
  font-size: 2.2rem;
  font-weight: 700;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 400px;
  overflow: auto;

  padding: 12px 18px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2.5rem;
`;
