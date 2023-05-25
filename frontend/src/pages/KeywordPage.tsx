import styled from "styled-components"
import { useState, useEffect } from "react"
import Searchbar from "../components/common/Searchbar/Searchbar"
import KeywordTitle from "../components/KeywordPage/KeywordTitle"

const KeywordPage = () => {
  // searchbar focus 상태 확인 state
  const [isFocus, setIsFocus] = useState<boolean>(false)

  // focus 상태 확인 함수
  const getIsFocus = (value: boolean) => {
    setIsFocus(value)
  }

  return (
    <KeywordPageWrapper>
      <SearchbarWrapper>
        <Searchbar page={"keyword"} />
      </SearchbarWrapper>
      <KeywordTitle isFocus={isFocus} />
    </KeywordPageWrapper>
  )
}

export default KeywordPage

const KeywordPageWrapper = styled.div`
  // size
  height: 100vh;
  width: 83.33vw;

  // position
  position: relative;
`

const SearchbarWrapper = styled.div`
  // position
  position: absolute;

  left: calc(41.667vw - 400px);
  top: 45vh;

  // size
  height: 45px;
  width: 800px;
`
