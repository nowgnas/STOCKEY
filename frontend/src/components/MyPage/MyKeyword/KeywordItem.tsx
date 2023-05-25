import { useSetRecoilState } from "recoil"
import styled from "styled-components"
import { myKeywordState } from "../../../stores/MyPageAtoms"

interface KeywordProps {
  id: number
  name: string
  description: string | null
}

const KeywordItem = ({
  keyword,
  isSelected,
}: {
  keyword: KeywordProps
  isSelected: boolean
}) => {
  // MyKeyword state
  const setMyKeyword = useSetRecoilState(myKeywordState)
  // handle click
  const handleClick = () => {
    setMyKeyword(keyword)
  }

  return (
    <>
      <ItemDiv
        onClick={handleClick}
        className={isSelected ? "isSelected" : undefined}
      >
        <div>{keyword.name}</div>
      </ItemDiv>
    </>
  )
}

export default KeywordItem

const ItemDiv = styled.div`
  // size
  width: 45%;
  height: 40px;

  // flex-box
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5%;

  // margin & padding
  padding: 24px;
  margin: 5px 5px;

  // border-radius
  border-radius: 12px;

  //cursor
  cursor: pointer;

  // background
  background: white;

  // font
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--custom-black);

  // shadow
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.25);

  // transition
  transition: all 0.3s ease-in-out;

  // hover
  &:hover {
    background: var(--custom-gradient-pink);
    transform: scale(1.02);
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  }

  &.isSelected {
    background: var(--custom-gradient-pink);
    transform: scale(1.02);
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  }
`
