import styled from "styled-components"

interface Props {
  type: string
  description: string | null
}
const BizBlock = ({ type, description }: Props) => {
  const bizType = type.split(" ")[0]
  return (
    <BlockWrapper>
      <BizTypeBox>
        <BizTypeWrapper type={type}>
          <img src={`/businessLogos/${bizType}.png`} alt="buisness icon" />
          <p>{type}</p>
        </BizTypeWrapper>
      </BizTypeBox>
      <BizDetailContainer>
        <BizDetail>{description}</BizDetail>
      </BizDetailContainer>
    </BlockWrapper>
  )
}

export default BizBlock

const BlockWrapper = styled.div`
  display: inline-block;
  text-align: center;
  width: 100%;

  &:hover div:nth-child(1) {
    transform: translateY(-6px);
    transition: transform 0.3s ease-in-out;
  }
  &:hover div:nth-child(2) {
    background-position: 100% -100%;
    transition: background 0.3s ease-in-out;
  }
  &:hover div:nth-child(2) > div {
    display: block;
  }
`

const BizTypeBox = styled.div`
  height: 14rem;
  width: 80%;
  border-radius: 24px;
  display: inline-block;
  margin-bottom: 0px;
  & img {
    width: 50%;
    scale: 0.8;
  }
  & p {
    font-size: 1.8rem;
    font-weight: bold;
    margin-block: 5% 5%;
    white-space: pre-wrap;
  }
`
const BizTypeWrapper = styled.div<{ type: string }>`
  background-color: var(--custom-purple-4);
  box-shadow: rgba(0, 0, 0, 0.3) 1px 2px 10px 0px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  height: 100%;
  width: 100%;
`

const BizDetailContainer = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 125px 20px 10px 20px;
  border-radius: 20px;
  background: linear-gradient(transparent, transparent 50%, white 50%, white);
  background-size: 100% 200%;
  border: 5px solid white;
  margin: -120px 0px 0px 0px;
  width: 100%;
`
const BizDetail = styled.div`
  line-height: 2.5rem;
  font-size: 1.4rem;
  text-align: left;
  display: none;
`
