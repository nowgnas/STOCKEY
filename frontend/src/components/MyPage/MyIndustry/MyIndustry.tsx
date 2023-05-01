import styled from "styled-components"
import SubTitle from "../SubTitle"
import IndustryList from "./IndustryList"

interface Props {
  isActivate?: boolean
  isVisible: boolean
}

const MyIndustry = ({ isActivate = false, isVisible }: Props) => {
  return (
    <>
      <MyIndustryWrapper
        className={
          !isVisible ? "isInvisible" : isActivate ? "isActivate" : undefined
        }
      >
        {isVisible ? (
          <>
            <SubTitle
              subTitle="관심 산업"
              description="해당 산업으로 이동할 수 있습니다"
            />
            <IndustryList />
          </>
        ) : undefined}
      </MyIndustryWrapper>
    </>
  )
}

export default MyIndustry

const MyIndustryWrapper = styled.div`
  // size
  width: calc(41.665vw - 48px);
  height: 37vh;

  // margin & padding
  margin-top: 12px;
  padding: 24px;

  // background
  background-color: #fafafe;

  // border
  border-radius: 24px;

  // box-shadow
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.25);

  // transition
  opacity: 1;
  transition: all 1s ease-in-out;

  // 드래그 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &.isInvisible {
    opacity: 0;
    display: none;
  }

  &.isActivate {
    opacity: 1;
    width: calc(50vw - 36px);
  }
`
