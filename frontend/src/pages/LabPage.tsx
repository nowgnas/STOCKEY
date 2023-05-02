// import styled from "styled-components"
import StockAccordion from "../components/LabPage/StockAccordion";
import KeywordAccordion from "../components/LabPage/KeywordAccordion";
import TargetListSection from "../components/LabPage/TargetListSection";

import Grid from "@mui/material/Grid"
import styled from "@emotion/styled"


const LabPage = () => {
  return (
    <PageGrid container>
      <AccordionGrid container item xs={8} sm={3.2}>
        <StockAccordion />
        <KeywordAccordion />
      </AccordionGrid>
      <Grid item xs={8} sm={7}>
        <TargetListSection />
      </Grid>
    </PageGrid>
  )
}

export default LabPage;

const PageGrid = styled(Grid)({
  padding: "62px",
  justifyContent: "space-evenly",
})

const AccordionGrid = styled(Grid)({
  gap: "45px",
})