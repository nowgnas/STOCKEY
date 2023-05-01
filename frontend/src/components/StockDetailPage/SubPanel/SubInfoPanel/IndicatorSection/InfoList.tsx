import { PanelSubTitle } from "../../KeywordPanel/KeywordPanel"
import InfoListItem from "./InfoListItem"
import { Grid } from "@mui/material"
import { useRecoilValue } from "recoil"
import { stockDetailState } from "../../../../../stores/StockDetailAtoms"

const InfoList = () => {
  const stockDetail = useRecoilValue(stockDetailState)

  // 매출액 표기 포맷 설정
  let companySales = stockDetail?.companySales
  if (companySales) {
    const regExp = /\D/
    // 매출액 단위 추출
    const unit: string | undefined = companySales.match(regExp)?.[0]
    if (unit) {
      const sales = companySales.split(unit)
      // 가장 큰 단위를 기준으로 하나 아래 단위가 있다면 소수점 첫째자리까지 표기 ex) 1조 2천억 -> 1.2조
      // 9,290억 (2021.12) 이런 데이터의 경우 가장 큰 단위만 표기
      if (/\d/.test(sales[1][0])) {
        companySales = `${sales?.[0]}.${sales?.[1][0]}${unit}`
      } else {
        companySales = `${sales?.[0]}${unit}`
      }
    }
  }

  return (
    <>
      <PanelSubTitle>{stockDetail?.name}는 어떤 회사인가요?</PanelSubTitle>
      <Grid container rowSpacing={1} columnSpacing={1} mb={3}>
        <Grid item xs={6}>
          <InfoListItem
            type="finance"
            value={stockDetail?.basicInfo.slice(2)}
          />
        </Grid>
        <Grid item xs={6}>
          <InfoListItem type="size" value={stockDetail?.companySize} />
        </Grid>
        <Grid item xs={6}>
          <InfoListItem type="sales" value={companySales} />
        </Grid>
        <Grid item xs={6}>
          <InfoListItem
            type="credit_rating"
            value={stockDetail?.creditRank.split(" ")[0]}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default InfoList
