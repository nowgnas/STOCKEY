import { Grid } from "@mui/material"
import BizBlock from "./BizBlock"
import { PanelSubTitle } from "../../KeywordPanel/KeywordPanel"
import { useRecoilValue } from "recoil"
import { stockDetailState } from "../../../../../stores/StockDetailAtoms"

const MainBizSection = () => {
  const stockDetail = useRecoilValue(stockDetailState)
  const bizList = stockDetail?.businesses

  return (
    <>
      <PanelSubTitle>잘 나가는 사업 TOP {bizList?.length}</PanelSubTitle>
      <Grid container spacing={1} mb={3}>
        {bizList?.map((biz, index) => (
          <Grid item xs key={`biz-${index}`}>
            <BizBlock type={biz.name} description={biz.description} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default MainBizSection
