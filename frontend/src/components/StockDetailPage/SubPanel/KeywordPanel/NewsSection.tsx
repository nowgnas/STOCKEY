import { Grid } from "@mui/material"
import NewsSummaryBtn from "./NewsSummaryBtn"
import NewsList from "./NewsList"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { KeywordPanelProps } from "./KeywordPanel"
import { useKeyphraseList } from "../../../../hooks/useKeyphraseList"
import { keyphraseAnalysisParamsState } from "../../../../stores/StockDetailAtoms"

const NewsSection = ({ keywordId, keyword }: KeywordPanelProps) => {
  const keyphraseAnalysisParams = useRecoilValue(keyphraseAnalysisParamsState)
  const { data: keyphraseList } = useKeyphraseList(keyphraseAnalysisParams)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  return (
    <>
      <Grid container spacing={0.5} mb={2}>
        {keyphraseList !== undefined &&
          keyphraseList.map((keyphraseData, index) => (
            <Grid item xs={6}>
              <NewsSummaryBtn
                key={keyphraseData.key_phrase}
                keyphrase={keyphraseData.key_phrase}
                setSelectedIndex={setSelectedIndex}
                index={index}
                className={
                  selectedIndex === index ? "selected" : "not-selected"
                }
              />
            </Grid>
          ))}
      </Grid>
      {selectedIndex !== null && keyphraseList !== undefined && (
        <NewsList newsList={keyphraseList[selectedIndex]?.news} />
      )}
    </>
  )
}

export default NewsSection
