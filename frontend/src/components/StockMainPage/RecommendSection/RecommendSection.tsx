import styled from "styled-components"

const RecommendSection = () => {
  return (
    <StyledDiv>
      <StyledTitle>~~~ 추천 종목</StyledTitle>
    </StyledDiv>
  )
}

export default RecommendSection

const StyledDiv = styled.div`
  background-color: #fcfcfc;
  border-radius: 24px;
  border: 5px solid #cccccc;
  padding: 5%;
`
const StyledTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
`
