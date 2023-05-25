import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { labKeywordSearchInput } from "../../stores/LaboratoryAtoms";
import AccordionSearchBar from "./AccordionSearchBar";

const KeywordSearchBar = () => {
  const [searchInput, setSearchInput] = useRecoilState(labKeywordSearchInput);

  // searchInput 변경될때, setTimeout 걸어서 query refetch 시키기
  useEffect(() => {

  }, [searchInput]);

  return (
    <AccordionSearchBar
      type="KEYWORD"
      text={searchInput}
      setText={setSearchInput}
    />
  );
};

export default KeywordSearchBar;
