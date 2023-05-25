import styled from "@emotion/styled"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import { CardActionArea } from "@mui/material"
import { useNavigate } from "react-router-dom"

export interface IndustryInfoType {
  id: number
  name: string
  description: string | null
  category: string
}

const IndustryCard = ({ industryInfo }: { industryInfo: IndustryInfoType }) => {
  const navigate = useNavigate()
  const onClickIndustryCard = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigate(`/industry/${industryInfo.name}`)
  }

  return (
    <IndustryCardWrapper>
      <IndustryCardActionArea onClick={onClickIndustryCard}>
        <IndustryCardContent>
          <IndustryCardBody>
            <IndustryCardImg src={`/industryLogos/${industryInfo.name}.png`} />
          </IndustryCardBody>
          <IndustryCardNameArea>
            <NameTagP>{industryInfo.name}</NameTagP>
          </IndustryCardNameArea>
        </IndustryCardContent>
      </IndustryCardActionArea>
    </IndustryCardWrapper>
  )
}

export default IndustryCard

const IndustryCardWrapper = styled(Card)({
  width: "auto",
  borderRadius: "24px",
  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
})

const IndustryCardActionArea = styled(CardActionArea)({
  width: "100%",
  height: "0px",
  paddingBottom: "166.66666667%",
  position: "relative",
})

const IndustryCardContent = styled(Box)({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
})

const IndustryCardBody = styled(Box)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
})

const IndustryCardImg = styled.img`
  border-radius: 50%;
  width: 80%;
`

const IndustryCardNameArea = styled(Box)({
  padding: "0px",
  width: "100%",
  height: "26.66666667%",
  background: "var(--custom-gradient-pink)",
  borderRadius: "0px 0px 24px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const NameTagP = styled.p`
  margin: 0;
  padding: 4px 8px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: calc(0.5rem + 0.5vw);

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.1px;
  overflow-wrap: anywhere;

  color: #000000;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
