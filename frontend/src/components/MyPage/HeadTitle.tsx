import styled from "styled-components"
import { useRecoilValue } from "recoil"
import { nicknameState } from "../../stores/atoms"

const HeadTitle = () => {
  // nickname state
  const nickname = useRecoilValue(nicknameState)

  return (
    <>
      <TitleDiv>
        <GradientSpan>{nickname}</GradientSpan>님, 안녕하세요!
      </TitleDiv>
    </>
  )
}

export default HeadTitle

const TitleDiv = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 4.8rem;
  line-height: 4.8rem;
  letter-spacing: 0.1px;

  bottom: 0px;
  margin: 0px;

  // size
  width: 100%;
`

const GradientSpan = styled.span`
  background: linear-gradient(
    92.18deg,
    #ff996c 1.48%,
    #ff8b7e 40.26%,
    #fe7598 98.93%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`
