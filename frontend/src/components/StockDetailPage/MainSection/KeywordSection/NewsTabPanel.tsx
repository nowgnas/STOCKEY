import { Box } from "@mui/material"
import LoadingComponent from "../../../common/Loading/LoadingComponent"
import styled from "styled-components"
import OtherKeywordList from "./OtherKeywordList"
import KeywordBarGraphInDetail from "./KeywordBarGraphInDetail"

interface Props {
  activeTab: number
  index: number
  isLoading: boolean
}

function NewsTabPanel({ activeTab, index, isLoading, ...other }: Props) {
  return (
    <div
      role="tabpanel"
      hidden={activeTab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {activeTab === index && (
        <TabPanelWrapper isLoading={isLoading}>
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <>
              <KeywordBarGraphInDetail />
              <OtherKeywordList />
            </>
          )}
        </TabPanelWrapper>
      )}
    </div>
  )
}

export default NewsTabPanel

const TabPanelWrapper = styled(Box)<{ isLoading: boolean }>`
  height: ${({ isLoading }) => (isLoading ? "200px" : "auto")};
  background-color: ${({ isLoading }) =>
    isLoading ? "#ffb3cb47" : "transparent"};
  border-radius: 24px;
  transition: all 0.5s ease-in-out;
`
