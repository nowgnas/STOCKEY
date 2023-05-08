import React from 'react';
import styled from "styled-components";

interface LabGraphType {
  
}

interface Props{
  item: LabGraphType;
}

const GraphComp = ({ item }: Props) => {
  return (
    <GraphWrapper>

    </GraphWrapper>
  )
}

export default GraphComp;

const GraphWrapper = styled.div`
  background: white;
  border-radius: 12px;
  width: 30%;

  //임시
  height: 300px;
`