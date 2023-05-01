import styled from "styled-components"

interface Props {
  price: number
  isHover: boolean
}

const PriceTag = ({ price, isHover }: Props) => {
  return (
    <>
      <BubbleDiv className={isHover ? "hover" : undefined}>{price}원</BubbleDiv>
    </>
  )
}

export default PriceTag

const BubbleDiv = styled.div`
  position: relative;
  background-color: var(--custom-black);
  border-radius: 12px;

  font-size: 1.2rem;
  font-weight: bold;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 80px;
  height: 40px;

  &:after {
    content: "";
    position: absolute;
    border-top: 10px solid var(--custom-black);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    top: 40px;
    left: 30px;
  }

  // transition
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &.hover {
    opacity: 1;
  }
`
