import { CircularProgress } from "@mui/material"
import styled from "styled-components"

function Spinner() {
  return (
    <Center>
      <CircularProgress color="secondary" size="5rem" />
    </Center>
  )
}

export default Spinner

const Center = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
`
