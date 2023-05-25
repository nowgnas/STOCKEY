import styled from "styled-components"
import SubTitle from "../SubTitle"
import KeywordList from "./KeywordList"

interface Props {
  isActivate?: boolean
}

const MyKeyword = ({ isActivate = false }: Props) => {
  return (
    <>
      <MyKeywordWrapper className={isActivate ? "isActivate" : undefined}>
        <SubTitle
          subTitle="단어장"
          description="관심 있는 단어를 한번에 확인해보세요"
        />
        <KeywordList />
      </MyKeywordWrapper>
    </>
  )
}

export default MyKeyword

const MyKeywordWrapper = styled.div`
  width: calc(41.665vw - 48px);
  height: 37vh;

  // margin & pdding
  padding: 24px;
  margin-top: 12px;

  // background
  background-color: #fafafe;

  // border
  border-radius: 24px;

  // box-shadow
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.25);

  // transition
  transition: width 0.8s ease-in-out;

  // 드래그 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &.isActivate {
    width: calc(50vw - 36px);
  }
`
