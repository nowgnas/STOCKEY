import { PanelLayout, HeaderWrapper, ContentWrapper } from "./StockAccordion";
import DndCard from "./DndCard";

const sampleItem = [
  {
    id: 1,
    name: "keyword1",
  },
  {
    id: 2,
    name: "keyword2",
  },
  {
    id: 3,
    name: "keyword3",
  },
  {
    id: 4,
    name: "keyword4",
  },
  {
    id: 5,
    name: "keyword5",
  },
  {
    id: 6,
    name: "keyword6",
  },
  {
    id: 7,
    name: "keyword7",
  },
  {
    id: 8,
    name: "keyword8",
  },
];

const KeywordAccordion = () => {


  return (
    <PanelLayout>
      <HeaderWrapper>키워드</HeaderWrapper>
      <ContentWrapper>
        {sampleItem.map((item) => {
          return (
            <DndCard
              key={item.id}
              item={item}
              type="KEYWORD"
            />
          );
        })}
      </ContentWrapper>
    </PanelLayout>
  );
};

export default KeywordAccordion;
