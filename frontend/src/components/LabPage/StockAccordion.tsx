import { useRecoilState, useRecoilValue } from "recoil";
import {
  StockCardType,
  stockAccordionOpenState,
  labStockSearchInput,
} from "../../stores/LaboratoryAtoms";
import { useStockEntire } from "../../hooks/useLabAccordion";
import AccordionLayout from "./AccordionLayout";


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

  // 전체 stock query hook
  const {data: stockEntire} = useStockEntire();

  // 검색 stock query


  // 검색어 있을 경우 (검색 결과) > 전체 stock
  // 고도화 해야함
  const stockItem = () => {
    if (searchInput.trim().length > 0) {
      return sampleItemSearch
    } else if (stockEntire) {
      return stockEntire
    } else {
      return []
    }
  }

  return (
    <AccordionLayout
      type="STOCK"
      items={stockItem()}
      openState={openState}
      setOpenState={setOpenState}
    />
  );
};

export default StockAccordion;
