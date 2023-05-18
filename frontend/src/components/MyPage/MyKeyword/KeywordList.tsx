import styled from "styled-components"
import KeywordItem from "./KeywordItem"
import { useRecoilValue, useRecoilState } from "recoil"
import { myKeywordState } from "../../../stores/MyPageAtoms"

// useQuery
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
// import { accessTokenState } from "../../../stores/atoms"
import customAxios from "../../../utils/customAxios"
import Spinner from "../../common/Spinner/Spinner"

export interface MyKeywordType {
  id: number
  name: string
  description: string | null
}

const KeywordList = () => {
  // selected myKeyword state
  const myKeyword = useRecoilValue(myKeywordState)
  // accesstoken state
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  // useNavigate
  const navigate = useNavigate()
  // customAxios
  const axios = customAxios({ isAuthNeeded: true, navigate: navigate })

  // useQuery: get my keyword
  const fetchMyKeywordList = () => {
    return axios.get("/keywords/keywordlist/my")
  }
  const select = (response: any) => {
    const data: MyKeywordType[] = response.data.data

    return data
  }
  const { isLoading, data: MyKeywordList } = useQuery(
    "getMyKeywordList",
    fetchMyKeywordList,
    {
      refetchOnMount: false,
      retry: false,
      enabled: !!sessionStorage.getItem("accessToken"),
      select,
    }
  )

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      {!!MyKeywordList?.length ? (
        <ListWrapper>
          {MyKeywordList?.map((keyword, key) => {
            const isSelected = keyword.name === myKeyword?.name ? true : false
            return (
              <KeywordItem
                key={key}
                keyword={keyword}
                isSelected={isSelected}
              />
            )
          })}
        </ListWrapper>
      ) : (
        <TextWrapper>관심있는 키워드를 등록해보세요</TextWrapper>
      )}
    </>
  )
}

export default KeywordList

const ListWrapper = styled.div`
  // size
  height: 25vh;
  width: 100%;

  // margin & padding
  margin: 12px;

  // display
  display: flex;
  gap: px;
  flex-wrap: wrap;

  // overflow
  overflow-y: scroll;

  // scroll bar
  // 아래의 모든 코드는 영역::코드로 사용
  &::-webkit-scrollbar {
    width: 25px; // 스크롤바의 너비
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 30px;
    border: 10px solid #fafafe;
  }

  &::-webkit-scrollbar-track {
    // background-color: rgba(0,0,0,0); // 스크롤바 뒷 배경 색상
  }
`

const TextWrapper = styled.div`
  // size:
  width: 100%;
  height: 100%;

  // flex-box
  display: flex;
  justify-content: center;
  align-items: center;

  // font
  font-size: 2rem;
  font-weight: bold;
  color: var(--custom-black);
`
