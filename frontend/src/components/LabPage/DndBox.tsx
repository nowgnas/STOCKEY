import { memo, useState, useRef } from "react";
import { useSetRecoilState } from "recoil";
import {
  selectedLabStockState,
  selectedLabKeywordListState,
  KeywordCardType,
  StockCardType,
} from "../../stores/LaboratoryAtoms";

import StockCardMini from "./StockCardMini";
import KeywordCardMini from "./KeywordCardMini";

import Zoom from '@mui/material/Zoom';
import DeleteIcon from "@mui/icons-material/Delete";
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
  const animeRef = useRef(true)
  
  const deleteHandler = () => {
    console.log("deleteHandler!");
    animeRef.current = false;
    // zoom out animation 위해 settimeout
    setTimeout(() => {
      if (type === "STOCK") {
        setStock(undefined);
      } else {
        const idx = parseInt(type[7]) - 1;
        setKeywordList((prev) => prev.filter((item, index) => index !== idx));
      }
      animeRef.current = true;
    }, 200);
  };

  return (
    <BoxWrapper>
      {(!item) ? (
        <DropBox>
          <DropImg src={'labImages/dragDropLogo.png'} />
          {text}
        </DropBox>
      ) : (
        <Zoom in={animeRef.current}>
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
                <DeleteIcon sx={{ fontSize: "5rem" }} />
              </IconWrapper>
            )}
          </CardWrapper>
        </Zoom>
      )}
    </BoxWrapper>
  );
};

export default memo(DndBox);

const BoxWrapper = styled.div`
  width: 120px;
  height: 120px;
  background: #f8f8f8;
  border-radius: 24px;
  border: 1px dashed #cac4d0;

  display: flex;
  justify-content: center;
  align-items: center;
`

const DropBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #79747e;
`;

const DropImg = styled.img`
`

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
  border: 1px solid #bfbfbf;
  color: #fb6f6f;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.2);
`;
