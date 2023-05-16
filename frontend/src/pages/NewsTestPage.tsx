import { PanelWrapper } from "../components/StockDetailPage/SubPanel/KeywordPanel/KeywordPanel";
import styled from "styled-components";
import NewsList from "../components/StockDetailPage/SubPanel/KeywordPanel/NewsList";

const sampleItem = [
  {
    url: 'https://n.news.naver.com/mnews/article/421/0006398951?sid=101', 
    date: '2022-10-18',
    title: '이마트, 20~31일 \'핼러윈 페스티벌\' 선보여'
  }, 
  { 
    url: 'https://n.news.naver.com/mnews/article/119/0002648923?sid=101',
    date: '2022-10-18',
    title: '친환경농업 집적지구로 농가 소득·유통·판로 ‘일석삼조’'
  }
]


const NewsTestPage = () => {
  return (
    <>
      <h1>News Test Page</h1>
      <PanelContainer>
        <PanelWrapper>
          <NewsList newsList={sampleItem}/>
        </PanelWrapper>
      </PanelContainer>
    </>
  )
};

export default NewsTestPage;

const PanelContainer = styled.div`
  width: calc(33.33vw - 36px);
  height: 100%;
`
