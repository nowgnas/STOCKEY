import styled from "styled-components"

interface Props {
  type: "finance" | "size" | "sales" | "credit_rating"
  value: string | undefined
}

const infoType = {
  finance: "재무평가",
  size: "기업규모",
  sales: "매출액",
  credit_rating: "신용등급",
}

const InfoListItem = ({ type, value }: Props) => {
  return (
    <InfoDiv>
      <InfoIcon src={`/infoLogos/${type}.png`} alt={type} />
      <InfoDetailDiv>
        <InfoType>{infoType[`${type}`]}</InfoType>
        <InfoValue>
          {type === "finance" && <SubDescription>상위 </SubDescription>}
          {value}
        </InfoValue>
      </InfoDetailDiv>
    </InfoDiv>
  )
}

export default InfoListItem

const InfoDiv = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 24px;
  border: 5px solid white;
  padding-block: 3%;
  width: 100%;
  & > img {
    // scale: 0.9;
  }
`
const InfoIcon = styled.img`
  width: 40%;
`

const InfoDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1vw;
  width: 45%;
  overflow: hidden;
  & p {
    font-weight: bold;
    margin: 0;
    white-space: nowrap;
  }
`

const InfoType = styled.p`
  font-size: 1rem;
  color: rgba(151, 151, 151, 1);
`
const InfoValue = styled.p`
  font-size: 2.6rem;
  margin-top: 0.8rem !important;
  color: black;
`
const SubDescription = styled.span`
  font-size: 1.3rem;
  color: rgba(109, 102, 102, 1);
`
