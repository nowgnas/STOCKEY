import styled from "styled-components"
import KeyphraseListItem from "./KeyphraseListItem"
import { useRecoilValue } from "recoil"
import {
  selectedKeywordState,
  keyphraseParamsState,
} from "../../../stores/StockMainAtoms"
import { useKeyphraseList } from "../../../hooks/useKeyphraseList"
import { Suspense } from "react"
import LoadingComponent from "../../common/Loading/LoadingComponent"

export const colors: string[] = ["orange", "pink", "purple"]
const KeyphraseList = () => {
  const { idx: selectedKeywordIdx, id } = useRecoilValue(selectedKeywordState)
  // keyphrase 리스트 읽어오기
  const keyphraseParams = useRecoilValue(keyphraseParamsState)
  const { data: keyphraseListData } = useKeyphraseList(keyphraseParams)
  console.log(keyphraseListData, "keyphraseListData")

  return (
    <KeyphraseContainer selectedIdx={selectedKeywordIdx}>
      {keyphraseListData?.map((phraseInfo, index) => {
        return (
          <KeyphraseListItem
            key={`keyphrase-${index}`}
            keyphrase={phraseInfo.key_phrase}
            backgroundColor={`var(--custom-${colors[selectedKeywordIdx]}-${
              index + 1
            })`}
            rank={index + 1}
          />
        )
      })}

      {keyphraseListData?.length === 0 && (
        <KeyphraseListItem
          keyphrase="키프레이즈를 찾지 못했어요"
          backgroundColor={`var(--custom-${colors[selectedKeywordIdx]}-1`}
          rank={1}
        />
      )}
    </KeyphraseContainer>
  )
}

export default KeyphraseList

export const KeyphraseContainer = styled.div<{ selectedIdx: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 24px 0px;
  width: 100%;
  background-color: white;
  border-radius: 36px;
  position: relative;
  height: 30%;

  // 말풍선 꼬리
  ::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: ${({ selectedIdx }) => 50 + (selectedIdx - 1) * 32}%;
    width: 0;
    height: 0;
    border: 2em solid transparent;
    border-top-color: #ffffff;
    border-bottom: 0;
    margin-left: -1.5em;
    margin-bottom: -1.5em;
    z-index: 1;
    transition: left 0.6s cubic-bezier(0.47, 1.64, 0.41, 0.8);
  }
`
