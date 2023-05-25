import {
  CardPaper,
  CardImg,
  CardText,
  CardWrapper,
  TextWrapper,
  CardTitle,
} from "./PriceAnalysisCard"
import { Grid } from "@mui/material"

interface Props {
  industry: string
  industryTotal: number
  industryRank: number
}

const CapitalAnalysisCard = ({
  industry,
  industryTotal,
  industryRank,
}: Props) => {
  return (
    <CardPaper elevation={2}>
      <CardWrapper container>
        <Grid item xs={2}>
          <CardImg src="/analysisLogos/rich.png" alt="시가총액 순위" />
        </Grid>
        <TextWrapper item xs={9}>
          <CardTitle>
            {industryRank < 6
              ? `${industry}의 대들보`
              : `장차 ${industry}의 거물이 될지도..?`}
          </CardTitle>
          <CardText>
            {industry} 종목 {industryTotal}개 중에 시가총액 규모 {industryRank}
            위예요!
          </CardText>
        </TextWrapper>
      </CardWrapper>
    </CardPaper>
  )
}

export default CapitalAnalysisCard
