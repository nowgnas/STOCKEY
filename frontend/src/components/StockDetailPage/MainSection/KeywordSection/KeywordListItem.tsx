import styled from "styled-components"
import GageBar from "./GageBar"
import GageChip from "./GageChip"
import { Grid } from "@mui/material"
import { useSetRecoilState } from "recoil"
import { panelTypeState } from "../../../../stores/StockDetailAtoms"
import { selectedKeywordState } from "../../../../stores/StockDetailAtoms"

interface Props {
  rank: number
  keyword: string
  percentage: number
  keywordId: number
}

const KeywordListItem = ({ rank, keyword, percentage, keywordId }: Props) => {
  const setSelectedKeyword = useSetRecoilState(selectedKeywordState)
  const setPanelType = useSetRecoilState(panelTypeState)
  const showKeywordPanel = () => {
    setSelectedKeyword({ id: keywordId, name: keyword })
    setPanelType("keyword")
  }

  return (
    <KeywordRow container onClick={showKeywordPanel}>
      <Grid item xs={1}>
        <ItalicSpan>{rank}</ItalicSpan>
      </Grid>
      <Grid item xs={3}>
        <Span>{keyword}</Span>
      </Grid>
      <Grid item xs={5} display={"flex"}>
        <GageBar
          gage={percentage}
          height="30%"
          color="#68E3BE"
          backgroundColor="#D0F1E8"
          animation
        />
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={2}>
        <GageChip gage={percentage} color="#68E3BE" backgroundColor="#F1FFFB" />
      </Grid>
    </KeywordRow>
  )
}

export default KeywordListItem

const KeywordRow = styled(Grid)`
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`

const Span = styled.span`
  font-size: 2.2rem;
  font-weight: bold;
  white-space: nowrap;
  color: #49454f;
`

const ItalicSpan = styled(Span)`
  font-size: 2.4rem;
  font-style: italic;
`
