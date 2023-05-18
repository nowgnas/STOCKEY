import styled from "styled-components"
import { useRecoilState, useRecoilValue } from "recoil"
import { myKeywordState } from "../stores/MyPageAtoms"
import { useEffect, useState } from "react"
import HeadTitle from "../components/MyPage/HeadTitle"
import MyStock from "../components/MyPage/MyStock/MyStock"
import MyIndustry from "../components/MyPage/MyIndustry/MyIndustry"
import MyKeyword from "../components/MyPage/MyKeyword/MyKeyword"
import KeywordPanel from "../components/StockDetailPage/SubPanel/KeywordPanel/KeywordPanel"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
// import { accessTokenState } from "../stores/atoms"
import { useNavigate } from "react-router-dom"

const MyPage = () => {
  // myKeyword state
  const [myKeyword, setMyKeword] = useRecoilState(myKeywordState)
  // keywordPanel state
  const [isActivate, setIsActivate] = useState<boolean>(false)

  useEffect(() => {
    setIsActivate(!!myKeyword ? true : false)
  }, [myKeyword])

  // handleClick to close panel
  const handleClick = () => {
    setIsActivate(false)
    setTimeout(() => {
      setMyKeword(undefined)
    }, 800)
  }

  return (
    <Wrapper>
      <ComponentWrapper>
        <MyPageWrapper>
          <HeadTitle />
          <MyStock isActivate={isActivate} />
          <ComponentRowWrapper>
            <MyKeyword isActivate={isActivate} />
            <MyIndustry isActivate={isActivate} isVisible={!isActivate} />
          </ComponentRowWrapper>
          <MyIndustry isActivate={isActivate} isVisible={isActivate} />
        </MyPageWrapper>
        <PannerWrapper className={isActivate ? "isActivate" : undefined}>
          {!!myKeyword ? (
            <>
              <PanelToggleBtn onClick={handleClick}>
                <KeyboardDoubleArrowRightIcon />
                <span>닫기</span>
              </PanelToggleBtn>
              <KeywordPanel
                keywordId={myKeyword?.id}
                keyword={myKeyword?.name}
              />
            </>
          ) : undefined}
        </PannerWrapper>
      </ComponentWrapper>
    </Wrapper>
  )
}
export default MyPage

const Wrapper = styled.div`
  position: relative;
  width: 83.33vw;
  height: 100vh;
  overflow: hidden;
`

const ComponentWrapper = styled.div`
  // flex-box
  display: flex;
  flex-direction: row;
  gap: 24px;
`

const MyPageWrapper = styled.div`
  // size
  width: 100%;
  height: 100vh;

  // padding & margin
  padding: 36px;

  // overflow
  overflow-x: hidden;
  overflow-y: scroll;

  // scrollbar
  &::-webkit-scrollbar {
    display: none;
  }
`

// component 가로 정렬용 wrapper
const ComponentRowWrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: nowrap;
  width: 200vw;
`

const PannerWrapper = styled.div`
  // size
  height: 100vh;
  width: calc(33.33vw - 36px);

  // position
  position: absolute;
  right: -100%;

  // transition
  transition: all 0.8s ease-in-out;

  &.isActivate {
    width: calc(100%-36px);
    right: 0px;
  }
`

// keyword section close button
const PanelToggleBtn = styled.div`
  // size
  width: 66px;
  height: 40px;

  // background
  background-color: var(--custom-pink-3);
  background: opacity 0.5s;

  // position
  position: absolute;
  top: 40px;
  left: -32px;

  // border
  border-radius: 25% 0 0 25%;
  border: 3px solid var(--custom-pink-2);
  border-right: none;

  // flex-box
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  // cursor
  cursor: pointer;

  // z-index
  z-index: 0;

  // transition
  transition: left 0.3s;

  & > span {
    font-size: 1.2rem;
    font-weight: bold;
  }

  &:hover {
    left: -66px;
  }
`
