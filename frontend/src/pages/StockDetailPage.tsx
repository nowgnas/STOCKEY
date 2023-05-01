import Grid from "@mui/material/Grid"
import StockMainSection from "../components/StockDetailPage/MainSection/StockMainSection"
import SubPanel from "../components/StockDetailPage/SubPanel/SubPanel"
import { useState } from "react"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"
import styled from "styled-components"
import { useStockDetail } from "../hooks/useStockDetail"
import { useParams } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { stockDetailState } from "../stores/StockDetailAtoms"

const StockDetailPage = () => {
  const params = useParams()
  const stockId = Number(params?.stockId)
  const { data: stockDetail } = useStockDetail(stockId)
  const setStockDetail = useSetRecoilState(stockDetailState)
  setStockDetail(stockDetail)

  const [isPanelExpanded, setIsPanelExpanded] = useState(true)
  const handleToggle = () => {
    setIsPanelExpanded((isPanelExpanded) => !isPanelExpanded)
  }

  return (
    <Grid container height={"100%"} columns={16}>
      <MainGrid item xs={isPanelExpanded ? 10 : 15}>
        <StockMainSection />
      </MainGrid>
      <PanelGrid item xs={isPanelExpanded ? 6 : 1}>
        <SubPanel isPanelExpanded={isPanelExpanded} />
        <PanelToggleBtn onClick={handleToggle}>
          {isPanelExpanded ? (
            <KeyboardDoubleArrowRightIcon fontSize="large" />
          ) : (
            <KeyboardDoubleArrowLeftIcon fontSize="large" />
          )}
          {isPanelExpanded ? <span>접기</span> : <span>펼치기</span>}
        </PanelToggleBtn>
      </PanelGrid>
    </Grid>
  )
}

export default StockDetailPage
const MainGrid = styled(Grid)`
  transition: all 0.5s;
  height: 100%;
`

const PanelGrid = styled(Grid)`
  position: relative;
  transition: all 0.5s;
  height: 100%;
`

const PanelToggleBtn = styled.div`
  width: 66px;
  height: 40px;
  background-color: var(--custom-pink-3);
  background: opacity 0.5s;
  position: absolute;
  top: 40px;
  left: -32px;
  border-radius: 25% 0 0 25%;
  border: 3px solid var(--custom-pink-2);
  border-right: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  z-index: 0;
  transition: left 0.3s;

  & > span {
    font-size: 1.2rem;
    font-weight: bold;
  }

  &:hover {
    left: -66px;
  }
`
