import { useRecoilState, useRecoilValue } from "recoil";
import {
  KeywordCardType,
  keywordAccordionOpenState,
  selectedLabStockState,
  labKeywordSearchInput
} from "../../stores/LaboratoryAtoms";
import AccordionLayout from "./AccordionLayout";

const sampleItemStock: KeywordCardType[] = [
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
];

const sampleItemSearch: KeywordCardType[] = [
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
]


const KeywordAccordion = () => {
  const [openState, setOpenState] = useRecoilState(keywordAccordionOpenState);
  const selectedStock = useRecoilValue(selectedLabStockState);
  const searchInput = useRecoilValue(labKeywordSearchInput);

  // 분석 stock에 해당하는 keyword query


  // 검색 keyword query


  return (
    <AccordionLayout
      type="KEYWORD"
      // 검색어 있을 경우 (검색결과) > stock 선택했을 경우 (stock에 맞는 keyword) > 아무것도 없을 경우 (빈 배열)
      items={searchInput.trim().length > 0 ? sampleItemSearch : selectedStock ? sampleItemStock : []}
      openState={openState}
      setOpenState={setOpenState}
    />
  );
};

export default KeywordAccordion;
