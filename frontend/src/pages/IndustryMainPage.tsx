import PageTitle from "../components/common/PageTitle/PageTitle"
import { IndustrySelector } from "../components/IndustryMainPage"
import { IndustryMarketCapInfoArea } from "../components/IndustryMainPage"
import { FavoriteIndustryInfoArea } from "../components/IndustryMainPage"
import Grid from "@mui/material/Grid"
import styled from "@emotion/styled"

const IndustryMainPage = () => {
  const pageTitleInfo = {
    pageTitle: "산업 정보",
    pageDescription: "산업에 대한 정보를 볼 수 있는 공간입니다",
  }

  return (
    <PageGrid container spacing={4.5}>
      <PageTitle pageTitleInfo={pageTitleInfo} />
      <Grid item container spacing={4.5}>
        <Grid item xs={5}>
          <SelectorWrapper>
            <IndustrySelector />
          </SelectorWrapper>
        </Grid>
        <Grid item xs={7} container direction="column" spacing={4.5}>
          <ItemGrid item xs={7}>
            <IndustryMarketCapInfoArea />
          </ItemGrid>
          <ItemGrid item xs={5}>
            <FavoriteIndustryInfoArea />
          </ItemGrid>
        </Grid>
      </Grid>
    </PageGrid>
  )
}

export default IndustryMainPage

const PageGrid = styled(Grid)({
  padding: "36px",
})

const SelectorWrapper = styled.div`
  min-height: 884px;
  height: calc(100vh - 156px);
`

const ItemGrid = styled(Grid)({
  width: "100%",
})
