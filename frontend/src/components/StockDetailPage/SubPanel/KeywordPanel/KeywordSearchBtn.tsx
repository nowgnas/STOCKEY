import Button from "@mui/material/Button"
import styled from "styled-components"
import { Tooltip, Zoom } from "@mui/material"

interface Props {
  keyword: string
}

const HighlyRelatedStockSwitch = ({ keyword }: Props) => {
  const btnClickHandler = () => {
    window.open(`https://search.naver.com/search.naver?query=${keyword}`)
  }

  return (
    <Tooltip
      title="네이버 검색 결과를 확인해보세요!"
      TransitionComponent={Zoom}
      placement="bottom-start"
      arrow
    >
      <StockSwitchBtn disabled={false} size="large" onClick={btnClickHandler}>
        <SwitchLayout>
          <WebsiteLogo src="/logo_images/naver.png" />

          <BtnText>{keyword}</BtnText>
        </SwitchLayout>
      </StockSwitchBtn>
    </Tooltip>
  )
  //
}

export default HighlyRelatedStockSwitch

const StockSwitchBtn = styled(Button)`
  background-color: var(--custom-green-4) !important;
  border-radius: 36px !important;
  color: black !important;
  font-weight: bold !important;
  align-items: center !important;
  display: inline-block;
`
const SwitchLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const BtnText = styled.p`
  font-size: 1.4rem;
  margin: 0 0 0 0.5rem !important;
  line-height: normal;
`
const WebsiteLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`
