import { memo } from "react";
import { SetterOrUpdater } from "recoil";
import { StockCardType, KeywordCardType } from "./LabType";
import StockSearchBar from "./StockSearchBar";
import KeywordSearchBar from "./KeywordSearchBar";
import DndCard from "./DndCard";
import InfiniteScroll from "react-infinite-scroller";
import Collapse from "@mui/material/Collapse";
import styled from "styled-components";

interface Props {
  type: string;
  items: StockCardType[] | KeywordCardType[];
  openState: boolean;
  setOpenState: SetterOrUpdater<boolean>;
  fetchNextPage?: any;
  hasNextPage?: boolean | undefined;
}

const AccordionLayout = ({ type, items, openState, setOpenState, fetchNextPage = () => {}, hasNextPage = false }: Props) => {
  const headerText = type === "STOCK" ? "종목" : "키워드";

  return (
    <PanelLayout>
      <HeaderWrapper>
        {headerText}
        {type === "STOCK" ? <StockSearchBar /> : <KeywordSearchBar />}
      </HeaderWrapper>

      <Collapse in={openState} timeout={500}>
        <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
          <ContentWrapper>
            {items.map((item) => {
              return (
                <CardWrapper key={item.id}>
                  <DndCard item={item} type={type} />
                </CardWrapper>
              );
            })}
            {/* item 홀수개인 경우 layout 위해 fake wrapper 하나 추가 */}
            {items.length % 2 === 1 && <CardWrapper />}
          </ContentWrapper>
        </InfiniteScroll>
      </Collapse>

      <TailWrapper>
        <ChevonWrapper
          src={"labImages/chevon.png"}
          alt=""
          openState={openState}
          onClick={() => setOpenState((prev) => !prev)}
        />
      </TailWrapper>
    </PanelLayout>
  );
};

export default memo(AccordionLayout);

const PanelLayout = styled.div`
  width: 100%;
  background: #f8f8f8;
  border-radius: 24px;

  padding: 18px 0px 12px 0;

  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.3);
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 30px 18px 30px;
  font-size: 2.2rem;
  font-weight: 700;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 400px;
  padding: 12px 18px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  gap: 2.5rem;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 1.8rem;
  }
  ::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 24px;
    border: 5px solid transparent;
    background-clip: padding-box;
  }
  ::-webkit-scrollbar-track {
    width: 1.8rem;
  }
`;

const CardWrapper = styled.div`
  width: 100px;
  height: 100px;
`;

const TailWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 12px;
`;
const ChevonWrapper = styled.img<{ openState: boolean }>`
  transform: ${(props) => (props.openState ? "scaleY(-1)" : undefined)};
  transition: 0.5s;
  cursor: pointer;
`;
