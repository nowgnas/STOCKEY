import { memo, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  selectedLabStockState,
  selectedLabKeywordListState,
  KeywordCardType,
  StockCardType,
} from "../../stores/LaboratoryAtoms";

import StockCardMini from "./StockCardMini";
import KeywordCardMini from "./KeywordCardMini";

import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components";

interface Props {
  type: string;
  item: StockCardType | KeywordCardType | undefined;
}

const DndBox = ({ type, item }: Props) => {
  // type: STOCK / KEYWORD1 / KEYWORD2 / KEYWORD3
  const text = type === "STOCK" ? "종목" : "키워드";
  const setStock = useSetRecoilState(selectedLabStockState);
  const setKeywordList = useSetRecoilState(selectedLabKeywordListState);
  const [mouseOver, setMouseOver] = useState(false);

  // item == undefined일 경우
  if (!item) {
    return <DropBox>{text}</DropBox>;
  }

  const deleteHandler = () => {
    console.log("deleteHandler!");
    if (type === "STOCK") {
      setStock(undefined);
    } else {
      const idx = parseInt(type[7]) - 1;
      setKeywordList((prev) => prev.filter((item, index) => index !== idx));
    }
  };

  return (
    <CardWrapper
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {type === "STOCK" ? (
        <StockCardMini item={item} />
      ) : (
        <KeywordCardMini item={item} />
      )}
      {mouseOver && (
        <IconWrapper onClick={deleteHandler}>
          <DeleteIcon sx={{fontSize: "5rem"}}/>
        </IconWrapper>
      )}
    </CardWrapper>
  );
};

export default memo(DndBox);

const DropBox = styled.div`
  width: 120px;
  height: 120px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 12px;
  font-weight: 700;
  color: #79747e;
  background: #f8f8f8;

  border: 1.5px dashed #cac4d0;
  border-radius: 24px;
`;

const CardWrapper = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0%;
  right: 0%;
  
  border-radius: 24px;
  border: 1px solid #BFBFBF;
  color: #FB6F6F;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.2);
`;
