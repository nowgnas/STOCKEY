import styled from "styled-components"
import SearchList from "./SearchList"
import { useState, useEffect, useCallback } from "react"
import debounceFunction from "../Debouncer/Debouncer"
import SearchIcon from "@mui/icons-material/Search"
import { useRecoilState } from "recoil"
import { KeywordSearchState } from "../../../stores/KeywordPageAtoms"
import { useNavigate } from "react-router-dom"

type SearchbarProps = {
  page: string
}

const Searchbar = ({ page }: SearchbarProps) => {
  // focus 확인 state
  const [isFocus, setIsFocus] = useState<boolean>(false)
  // input ref state
  const [inputValue, setInputValue] = useState<string | undefined>(undefined)
  // 마우스 hovering state
  const [isHovering, setIsHovering] = useState<boolean>(false)
  // 관련 검색어 상단 단어 state
  const [firstKeyword, setFirstKeyword] = useRecoilState(KeywordSearchState)

  // useNavigate
  const navigate = useNavigate()

  // input box focus 확인
  const handleFocus = () => {
    if (!isFocus) {
      setIsFocus(true)
    } else if (isFocus) {
      setIsFocus(false)
    }
  }

  // debouncer를 통한 타이핑 완료 후 검색어 저장
  const printValue = useCallback(
    debounceFunction(
      (value: string | undefined) => {
        setInputValue(value)
      },
      page === "stock" ? 100 : 200
    ),
    []
  )

  // input value 확인
  const handleInput = (event: React.ChangeEvent<HTMLInputElement> | null) => {
    printValue(event?.target.value)
  }

  // hovering 상태 확인
  const handleMouseOver = () => {
    setIsHovering(true)
  }
  const handleMouseOut = () => {
    setIsHovering(false)
  }

  // 관련 검색어 최상단 이동
  const moveToFirstKeyword = () => {
    const url =
      page === "stock"
        ? `/stock/${firstKeyword?.id}`
        : `/keyword/${firstKeyword?.name}`
    navigate(url)
  }

  // search icon click handler
  const handleClick = () => {
    if (!!firstKeyword) {
      moveToFirstKeyword()
    }
  }

  // enter press handler
  const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !!firstKeyword && isFocus) {
      moveToFirstKeyword()
    }
  }

  // reset first keyword
  useEffect(() => {
    setFirstKeyword(undefined)
  }, [])

  return (
    <>
      <SearchbarWrapper>
        <SearchbarDiv
          className={isFocus ? "onFocus" : undefined}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <IconDiv>
            <SearchbarInput
              onFocus={handleFocus}
              onBlur={handleFocus}
              onChange={handleInput}
              onKeyDown={handlePressEnter}
              placeholder={
                page === "stock"
                  ? "주식 종목을 검색하세요"
                  : "키워드를 검색하세요"
              }
            />
            <SearchIcon
              fontSize="large"
              onClick={handleClick}
              sx={{ cursor: "pointer" }}
            />
          </IconDiv>
          {(isFocus || isHovering) && inputValue ? (
            <SearchList value={inputValue} page={page} />
          ) : undefined}
        </SearchbarDiv>
      </SearchbarWrapper>
    </>
  )
}

export default Searchbar

const SearchbarWrapper = styled.div`
  // 위치
  position: relative;

  // 글자
  font-size: 1.8rem;
  font-weight: bold;

  // 크기
  min-height: 44px;
`

const SearchbarInput = styled.input`
  font-size: inherit;
  font-weight: normal;
  width: 750px;

  // 테두리 없애기
  border: none;
  outline: none;

  // 배경 색상 없애기
  background-color: transparent;
`

const SearchbarDiv = styled.div`
  // 위치
  position: absolute;

  // 패딩
  padding: 10px 10px 10px 14px;

  // 형태
  border: 2px solid #f4f4ff;
  border-radius: 22px;
  background-color: #fafafe;

  // 그림자
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.25);

  // transition
  transition: box-shadow 0.15s;

  // onFocus
  &.onFocus {
    box-shadow: 2px 5px 7px rgba(0, 0, 0, 0.25);
  }
  // hover
  &:hover {
    box-shadow: 2px 5px 7px rgba(0, 0, 0, 0.25);
  }
`

const IconDiv = styled.div`
  // 폰트
  font-size: inherit;
  font-weight: inherit;
  color: inherit;

  // flex-box
  display: flex;
`
