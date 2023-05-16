import { useRecoilState, useRecoilValue } from "recoil";
import {
  StockCardType,
  stockAccordionOpenState,
  labStockSearchInput,
} from "../../stores/LaboratoryAtoms";
import AccordionLayout from "./AccordionLayout";

const sampleItemAll: StockCardType[] = [
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
];

const sampleItemSearch: StockCardType[] = [
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
  const [openState, setOpenState] = useRecoilState(stockAccordionOpenState);
  const searchInput = useRecoilValue(labStockSearchInput);

  // 전체 stock query


  // 검색 stock query


  return (
    <AccordionLayout
      type="STOCK"
      // 검색어 있을 경우 (검색 결과) > 전체 stock
      items={searchInput.trim().length > 0 ? sampleItemSearch : sampleItemAll}
      openState={openState}
      setOpenState={setOpenState}
    />
  );
};

export default StockAccordion;
