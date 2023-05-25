import SampleStock from "./SampleList"
import styled from "styled-components"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useKeywordSearch } from "../../../hooks/useKeywordSearch"
import { useSetRecoilState } from "recoil"
import { KeywordSearchState } from "../../../stores/KeywordPageAtoms"

type SearchListProps = {
  page: string
  value: string | undefined
}

interface Props {
  id: number
  name: string
}

const SearchList = ({ page, value }: SearchListProps) => {
  // 연관 검색어 저장 array
  const [searchResult, setSearchResult] = useState<Props[]>([])
  // 가장 상위 검색어 저장 state
  const setFirstKeyword = useSetRecoilState(KeywordSearchState)

  // useKeywordSearch custom hook
  const {
    isLoading,
    data: KeywordSearchResult,
    refetch,
  } = useKeywordSearch(value, page)

  // 입력값이 바뀔 때, 검색 결과 데이터를 갱신
  useEffect(() => {
    // page === "stock" 일 때 탐색 함수
    const saveSearchResult = () => {
      const sampleResult = SampleStock.filter((item: Props) =>
        item.name
          .toUpperCase()
          .replace(" ", "")
          .includes(value ? value.toUpperCase().replace(" ", "") : "")
      )
      return sampleResult
    }

    // page === "keyword" 일 때 탐색 함수
    if (page === "keyword") {
      refetch()
    }

    setSearchResult(
      page === "stock"
        ? saveSearchResult()
        : KeywordSearchResult
        ? KeywordSearchResult
        : []
    )
  }, [value, KeywordSearchResult])

  // 첫번째 단어 저장
  useEffect(() => {
    setFirstKeyword(!!searchResult?.length ? searchResult[0] : undefined)
  }, [searchResult])

  // 클릭시 해당 페이지로 이동하는 함수
  const navigate = useNavigate()
  const handleClick = (
    item: Props,
    event: React.MouseEvent<HTMLLIElement> | undefined
  ) => {
    setFirstKeyword(item)
    const url = page === "stock" ? `/stock/${item.id}` : `/keyword/${item.name}`
    navigate(url)
  }

  // 검색 내역 포함 부분 표시 함수
  const coloredItem = (item: Props, key: number) => {
    return (
      <ResultLi
        onClick={(event) => handleClick(item, event)}
        key={item.name + key}
      >
        {
          item.name?.split(
            page === "stock"
              ? value
                ? value.toUpperCase().replace(" ", "")
                : ""
              : value
              ? value.toLowerCase().replace(" ", "")
              : ""
          )[0]
        }
        <HiglightSpan>
          {page === "stock"
            ? value
              ? value.toUpperCase().replace(" ", "")
              : ""
            : value
            ? value.toLowerCase().replace(" ", "")
            : ""}
        </HiglightSpan>
        {
          item.name?.split(
            page === "stock"
              ? value
                ? value.toUpperCase().replace(" ", "")
                : ""
              : value
              ? value.toLowerCase().replace(" ", "")
              : ""
          )[1]
        }
      </ResultLi>
    )
  }

  return (
    <>
      <ResultUl>
        {searchResult.map((item, key) => {
          return coloredItem(item, key)
        })}
      </ResultUl>
    </>
  )
}

export default SearchList

const ResultUl = styled.ul`
  padding: 0px 12px 0px 0px;
`

const ResultLi = styled.li`
  // 글자
  font-weight: normal;
  font-size: inherit;

  // 리스트 dot 없애기
  list-style-type: none;

  // 패딩 조절
  padding: 10px 0px;

  // transition
  transition: background-color 0.1s;

  // 드래그 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  // 커서
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`

const HiglightSpan = styled.span`
  font-weight: bold;
  font-size: inherit;

  color: var(--custom-pink-1);
`
