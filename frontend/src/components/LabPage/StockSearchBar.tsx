import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { labStockSearchInput } from "../../stores/LaboratoryAtoms";
import AccordionSearchBar from "./AccordionSearchBar";

const StockSearchBar = () => {
  const [searchInput, setSearchInput] = useRecoilState(labStockSearchInput);

  // searchInput 변경될때, setTimeout 걸어서 query refetch 시키기 (useKeywordSearch hook 참고)
  useEffect(() => {
    
  }, [searchInput]);

  return (
    <AccordionSearchBar
      type="STOCK"
      text={searchInput}
      setText={setSearchInput}
    />
  );
};

export default StockSearchBar;
