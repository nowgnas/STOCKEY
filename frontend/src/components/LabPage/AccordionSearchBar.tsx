import { memo } from 'react';
import { useRecoilState } from "recoil";
import {  labStockSearchInput, labKeywordSearchInput } from "../../stores/LaboratoryAtoms";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

interface Props{
  type: string;
}

const AccordionSearchBar = ({type}: Props) => {
  const text = type === "STOCK" ? "주식을" : "키워드를"
  const [stockInput, setStockInput] = useRecoilState(labStockSearchInput);
  const [keywordInput, setKeywordInput] = useRecoilState(labKeywordSearchInput);

  console.log(type, stockInput, keywordInput)

  // 변경될때마다 query 보내기
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setInput(e.target.value);
    if (type === "STOCK") {
      setStockInput(e.target.value);
    } else {
      setKeywordInput(e.target.value);
    }
  }
  
  return (
    <SearchbarWrapper>
      <SearchbarDiv>
        <SearchbarInput
          value={type === "STOCK" ? stockInput : keywordInput}
          placeholder={`${text} 검색해보세요.`}
          onChange={changeHandler}
        />        
          <SearchIcon
            fontSize="large"
          />
      </SearchbarDiv>
    </SearchbarWrapper>
  );
};

export default memo(AccordionSearchBar);

const SearchbarWrapper = styled.div`
  width: 70%;
  height: 100%;

  font-size: 1.5rem;
  min-height: 44px;
`;

const SearchbarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 10px 14px;
  
  border: 2px solid #f4f4ff;
  border-radius: 22px;
  background-color: #fafafe;
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.25);
`;


const SearchbarInput = styled.input`
width: 90%;
border: none;
outline: none;
background-color: transparent;

::placeholder {
  color: var(--custom-gray-2);
  font-size: 1.2rem;
}
`;
