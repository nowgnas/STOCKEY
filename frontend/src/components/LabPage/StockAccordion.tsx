import { useRecoilState, useRecoilValue } from "recoil";
import {
  stockAccordionOpenState,
  labStockSearchInput,
} from "../../stores/LaboratoryAtoms";
import { useLabStockEntire, useLabStockSearch } from "../../hooks/useLabAccordion";
import AccordionLayout from "./AccordionLayout";

const StockAccordion = () => {
  const [openState, setOpenState] = useRecoilState(stockAccordionOpenState);
  const searchInput = useRecoilValue(labStockSearchInput);

  // 전체 stock query hook
  const {data: stockEntire} = useLabStockEntire();

  // 검색 stock query hook
  const {data: stockSearch} = useLabStockSearch(searchInput.trim());
  
  // data 흐름
  // 1. 검색어 있을 경우
  // 1.1 결과 있는 경우 > 검색 결과
  // 1.2 결과 없는 경우 > 빈 배열
  // 2. 검색어 없는 경우  > 전체

  const stockItem = () => {
    // 1.
    if (searchInput.trim().length > 0) {
      if (stockSearch) {
        // 1.1
        return stockSearch
      } else {
        // 1.2
        return []
      }
    } else {
      // 2.
      if (stockEntire) {
        return stockEntire
      } else {
        return []
      }
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