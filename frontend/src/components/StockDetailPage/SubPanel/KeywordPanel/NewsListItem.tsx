import styled from "styled-components"
import { Paper, Grid, Grow } from "@mui/material"
import { NewsProps } from "./NewsList"

interface Props {
  key: string
  news: NewsProps
  order: number
}

const NewsListItem = ({ key, news, order }: Props) => {
  return (
    <Grow key={key} in={true} timeout={order * 600}>
      <NewsDiv elevation={2}>
        <Grid container columns={16} columnSpacing={1}>
          <Grid
            item
            xs={2}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ImgDiv>
              <img src="/newsImg.png" alt="newsImg" width="100%" />
            </ImgDiv>
          </Grid>
          <Grid item xs={14} display="flex" flexDirection="column">
            <NewsTitle>{news.title}</NewsTitle>
            <NewsMeta>{news.date}</NewsMeta>
            {/* <NewsContent>{news.content}</NewsContent> */}
          </Grid>
        </Grid>
      </NewsDiv>
    </Grow>
  )
}

export default NewsListItem

const NewsDiv = styled(Paper)`
  border-radius: 24px;
  // width: 100%;
  margin-bottom: 12px;
  margin-inline: 6px;
  background-color: white;
  padding: 6px 16px;
`

const ImgDiv = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 12px;
  // border: 2px solid #a0a0a0;
  // background-color: #a0a0a0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`
const NewsTitle = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.5;
}
`
const NewsMeta = styled.p`
  font-size: 1.2rem;
  color: #a0a0a0;
  
  margin: 0;
  text-align: right;
}
`
const NewsContent = styled.p`
  font-size: 1.2rem;
  color: #a0a0a0;
}
`
