import styled from "styled-components"

interface Props {
  name: string
}

const StockName = ({ name }: Props) => {
  return <StockNameDiv>{name}</StockNameDiv>
}

export default StockName

const StockNameDiv = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`
