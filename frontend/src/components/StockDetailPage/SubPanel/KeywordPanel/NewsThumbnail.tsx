import { useState, useEffect } from "react";
import axios from "axios";
import * as cheerio from "cheerio";
import { NewsProps } from "./NewsList";
import { Paper, Grow } from "@mui/material";
import styled from "styled-components";

interface Props {
  key: string;
  news: NewsProps;
  order: number;
}

const NewsThumbnail = ({ key, news, order }: Props) => {
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);

  // news url이용해 img src, news 본문 가져오기
  useEffect(() => {
    setLoading(true);
    const fetchNewsImg = async () => {
      try {
        const res = await axios(news.url);
        if (res.data) {
          const $ = cheerio.load(res.data);
          setImgSrc($("#img1").attr("data-src")); // 뉴스 이미지
          setDescription($("#dic_area").text()); // 뉴스 본문
          setLoading(false);
        } else {
          throw new Error("Unexpected");
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchNewsImg();
  }, []);

  // 클릭시 뉴스 새 탭 띄우기
  const clickHandler = () => {
    window.open(news.url)
  }

  return (
    <Grow key={key} in={true} timeout={order * 600}>
      <PaperWrapper elevation={2} onClick={clickHandler}>
        <ColumnWrapper width={24}>
          <ImgWrapper>
            {!loading && (
              <ImgDiv src={imgSrc ? imgSrc : "/newsImg.png"} alt="newsImg" />
            )}
          </ImgWrapper>
        </ColumnWrapper>

        <ColumnWrapper width={72}>
          <ContentWrapper>
            <NewsTitle>{news.title}</NewsTitle>
            <NewsDescription>{description}</NewsDescription>
          </ContentWrapper>
          <NewsMeta>{news.date}</NewsMeta>
        </ColumnWrapper>
      </PaperWrapper>
    </Grow>
  );
};

export default NewsThumbnail;

const PaperWrapper = styled(Paper)`
  border-radius: 24px;
  margin-bottom: 12px;
  margin-inline: 6px;
  background-color: white;
  padding: 12px 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
`;

const ColumnWrapper = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
  max-height: 140px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: fill;
`;

const ImgDiv = styled.img`
  width: 100%;
  height: 100px;
  border-radius: 8px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 86%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  word-break: break-word;
  overflow: hidden;
`;

const NewsTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.5;
}
`;

const NewsDescription = styled.div`
  display:-webkit-box; 
  font-size: 1.2rem;
  
  // 말줄임표
  -webkit-line-clamp: 3;
  -webkit-box-orient:vertical;
  overflow:hidden;
  text-overflow: ellipsis;
  line-height: 1.4rem;
  height: 4.2rem;
`;

const NewsMeta = styled.div`
  margin-top: 0.5rem;
  text-align: right;
  font-size: 1.2rem;
  color: var(--custom-gray-2);
}
`;
