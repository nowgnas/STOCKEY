import styled from "@emotion/styled"
import IndustryCard from "./IndustryCard"
import { IndustryInfoType } from "./IndustryCard/IndustryCard"
import { Grid } from "@mui/material"

interface IndustryListProps {
  industryList: IndustryInfoType[]
}

const IndustryCardList = ({ industryList }: IndustryListProps) => {
  return (
    <IndustryCardListDiv>
      <IndustryCardListGrid container rowGap={3} columnSpacing={3}>
        {industryList?.map((industryInfo) => (
          <Grid key={industryInfo.id} item xs={12} sm={6} md={4}>
            <IndustryCard key={industryInfo.id} industryInfo={industryInfo} />
          </Grid>
        ))}
      </IndustryCardListGrid>
    </IndustryCardListDiv>
  )
}

export default IndustryCardList

const IndustryCardListDiv = styled.div`
  margin: 0px;
  padding: 5px 5px 5px 0px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 22px;
  }
  ::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 24px;
    border: 5px solid transparent;
    background-clip: padding-box;
  }
  ::-webkit-scrollbar-track {
    width: 22px;
  }
`

const IndustryCardListGrid = styled(Grid)({
  margin: 0,

  width: "100%",
  height: "100%",
})
