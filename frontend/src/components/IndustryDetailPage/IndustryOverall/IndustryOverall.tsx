import styled from "styled-components"

interface Props {
  industryInfo: {
    id: number
    name: string
    description: string | null
    category: string
  }
}

const IndustryOverall = ({ industryInfo }: Props) => {
  return (
    <AreaDiv>
      <OverallDiv>
        <ImgDiv>
          <img
            src={`/industryLogos/${industryInfo.name}.png`}
            alt="#"
            height="100%"
          />
        </ImgDiv>
        <DescriptionDiv>{industryInfo.description}</DescriptionDiv>
      </OverallDiv>
    </AreaDiv>
  )
}

export default IndustryOverall

const AreaDiv = styled.div`
  width: 100%;
  height: auto;
  min-height: 216px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const OverallDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: top;
  padding: 24px 18px;
  gap: 18px;
  background: var(--custom-purple-4);
  border-radius: 24px;
`

const ImgDiv = styled.div`
  height: 15vh;
  border-radius: 50%;
`

const DescriptionDiv = styled.div`
  flex-grow: 1;
  font-family: "Roboto";
  font-weight: normal;
  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: 0.1px;
  white-space: pre-line;
`
