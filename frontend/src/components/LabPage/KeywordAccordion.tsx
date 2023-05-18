import { useRef, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import {
  keywordAccordionOpenState,
  // selectedLabStockState,
  labKeywordSearchInput
} from "../../stores/LaboratoryAtoms";
import { useLabKeywordSearch } from "../../hooks/useLabAccordion";
import AccordionLayout from "./AccordionLayout";


const KeywordAccordion = () => {
  const [openState, setOpenState] = useRecoilState(keywordAccordionOpenState);
  const searchInput = useRecoilValue(labKeywordSearchInput);
  const fetchNext = useRef<any>(undefined);
  const hasNext = useRef<boolean | undefined>(undefined);
  
  
  // const selectedStock = useRecoilValue(selectedLabStockState);
  // 분석 stock에 해당하는 keyword query
  // 결과 6개 나옴 -> api 아직 x


  // 검색 keyword query
  const {data: keywordSearch, fetchNextPage: fetchhNextPageSearch, hasNextPage: hasNextPageSearch} = useLabKeywordSearch(searchInput.trim());
  // 무한스크롤 위해 data.pages를 일차원으로 flat -> 추후 back 데이터랑 맞춰야함
  const keywordSearchItem = useMemo(() => {
    if (keywordSearch) {
      return keywordSearch.pages.flatMap((ele) => ele);
    } else {
      return [];
    }
  }, [keywordSearch])

  // data 흐름
  // 1. 검색어 있을 경우
  // 1.1 결과 있는 경우 > 검색 결과
  // 1.2 결과 없는 경우 > 빈 배열
  // 2. 검색어 없을 경우
  // 2.1 stock 선택한 경우 > stock 관련 keyword
  // 2.2 stock 선택안한 경우 > 빈 배열

  const keywordItem = () => {
    if (searchInput.trim().length > 0) {
      // 1.
      fetchNext.current = fetchhNextPageSearch;
      hasNext.current = hasNextPageSearch;
      return keywordSearchItem
    } else {
      fetchNext.current = undefined;
      hasNext.current = false;
      return []
      // 2. 
      // if (selectedStock) {
      //   // 2.1
      //   return data
      // } else {
      //   // 2.2
      //   return []
      // }
    }
  }


  return (
    <AccordionLayout
      type="KEYWORD"
      items={keywordItem()}
      openState={openState}
      setOpenState={setOpenState}
      fetchNextPage={fetchNext.current}
      hasNextPage={hasNext.current}
    />
  );
};

export default KeywordAccordion;
