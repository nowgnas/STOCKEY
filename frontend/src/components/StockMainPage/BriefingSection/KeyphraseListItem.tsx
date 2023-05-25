import styled, { keyframes } from "styled-components"

interface Props {
  keyphrase: string
  backgroundColor: string
  rank: number
}

const KeyphraseListItem = ({ keyphrase, backgroundColor, rank }: Props) => {
  return (
    <KeyphraseBubble backgroundColor={backgroundColor} rank={rank}>
      <p>{keyphrase}</p>
    </KeyphraseBubble>
  )
}

export default KeyphraseListItem

export const spread = keyframes`
  0% {
    margin-right: -20%;
  }
  100% {
    margin-right: -3%;
  }
`

const KeyphraseBubble = styled.div<{ backgroundColor: string; rank: number }>`
  && {
    border-radius: 200px;
    background-color: ${(props) => props.backgroundColor};
    text-align: center;
    padding: 5%;
    z-index: ${(props) => 4 - props.rank};
    font-weight: bold;
    font-size: 1.8rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${spread} 0.7s ease;
    animation-fill-mode: both;
    & > p {
      margin: 0;
    }
    transition: all 0.6s ease-in-out;
  }
`
