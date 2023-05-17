import { useRecoilState } from "recoil";
import { labStockSearchInput } from "../../stores/LaboratoryAtoms";
import AccordionSearchBar from "./AccordionSearchBar";

const StockSearchBar = () => {
  const [searchInput, setSearchInput] = useRecoilState(labStockSearchInput);

  return (
    <AccordionSearchBar
      type="STOCK"
      text={searchInput}
      setText={setSearchInput}
    />
  );
};

export default StockSearchBar;
