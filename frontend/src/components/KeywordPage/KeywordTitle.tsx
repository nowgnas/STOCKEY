import styled from "styled-components"
import { useState, useEffect } from "react"

interface Props {
  isFocus: boolean
}

const KeywordTitle = ({ isFocus }: Props) => {
  // const setIsHiddenTimer = setTi
  return (
    <>
      <TitleDiv className={isFocus ? "isFocus" : undefined}>
        키워드 검색
        <div>STOCKEY에서 분석한 여러 키워드의 정보를 검색해보세요</div>
      </TitleDiv>
    </>
  )
}

export default KeywordTitle

const TitleDiv = styled.div`
  // position
  position: absolute;
  top: 25vh;

  // size
  width: 83.33vw;

  // font
  font-size: 6rem;
  font-weight: bold;
  color: var(--custom-black);
  text-align: center;

  > div {
    // font
    font-size: 1.2rem;
    font-weight: normal;
    color: #6d6666;

    // margin
    margin-top: 12px;
  }

  &.isFocus {
    display: none;
  }
`
