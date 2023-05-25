import {
  CardPaper,
  CardImg,
  CardText,
  TextWrapper,
  CardWrapper,
  CardTitle,
} from "./PriceAnalysisCard"
import { Grid } from "@mui/material"

interface Props {
  likeRank: number
  industry: string
  industryTotal: number
}

const LikeAnalysisCard = ({ likeRank, industry, industryTotal }: Props) => {
  let [result, title, text]: string[] = ["", "", ""]
  likeRank === 0
    ? ([result, title, text] = [
        "lonely",
        `관심이 필요해...😥`,
        `첫번째 좋아요를 눌러주세요!`,
      ])
    : likeRank < 6
    ? ([result, title, text] = [
        "like",
        `${industry}의 인플루언서😎`,
        `좋아요를 가장 많이 받은 ${industry} 종목 ${likeRank}위예요!`,
      ])
    : ([result, title, text] = [
        "diamond",
        `${industry}의 숨은 보석💎`,
        `좋아요를 가장 많이 받은 ${industry} 종목 ${likeRank}위예요!`,
      ])

  return (
    <CardPaper elevation={2}>
      <CardWrapper container>
        <Grid item xs={2}>
          <CardImg src={`/analysisLogos/${result}.png`} alt="시가총액 순위" />
        </Grid>
        <TextWrapper item xs={9}>
          <CardTitle>{title}</CardTitle>
          <CardText>{text}</CardText>
        </TextWrapper>
      </CardWrapper>
    </CardPaper>
  )
}

export default LikeAnalysisCard
