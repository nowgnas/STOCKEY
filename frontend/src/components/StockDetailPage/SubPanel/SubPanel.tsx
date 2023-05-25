import SubInfoPanel from "./SubInfoPanel/SubInfoPanel"
import KeywordPanel from "./KeywordPanel/KeywordPanel"
import styled from "styled-components"
import { useRecoilValue } from "recoil"
import { panelTypeState } from "../../../stores/StockDetailAtoms"
import { selectedKeywordState } from "../../../stores/StockDetailAtoms"

interface Props {
  isPanelExpanded: boolean
}

const SubPanel = ({ isPanelExpanded }: Props) => {
  const panelType = useRecoilValue(panelTypeState)
  const { id: keywordId, name: keyword } = useRecoilValue(selectedKeywordState)

  return (
    <PanelDiv>
      {isPanelExpanded ? (
        panelType === "subInfo" ? (
          <SubInfoPanel />
        ) : (
          <KeywordPanel keywordId={keywordId} keyword={keyword} />
        )
      ) : (
        <div></div>
      )}
    </PanelDiv>
  )
}

export default SubPanel

const PanelDiv = styled.div`
  margin: 0;
  padding: 0;
  background-color: var(--custom-background);
  border-top-left-radius: 30px;
  width: 100%;
  height: 100%;
  z-index: 1;
  position: relative;
`
