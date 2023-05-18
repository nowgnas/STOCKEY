import styled from "styled-components"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
// import { accessTokenState } from "../../../stores/atoms"
import customAxios from "../../../utils/customAxios"
import IndustryCard from "../../IndustryMainPage/IndustrySelector/IndustryCard"
import Spinner from "../../common/Spinner/Spinner"

// fetch data interface
export interface MyIndustryType {
  id: number
  name: string
  description: string
  category: string
}

const IndustryList = () => {
  // accessToken state
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const navigate = useNavigate()

  // custom Axios
  const axios = customAxios({ isAuthNeeded: true, navigate: navigate })

  // useQuery : MyIndustryList
  const fetchMyIndustryList = () => {
    return axios.get("/industry/stocklist/my")
  }

  const select = (response: any) => {
    const data: MyIndustryType[] = response.data.data
    return data
  }

  const { isLoading, data: MyIndustryList } = useQuery(
    "getMyIndustryLis",
    fetchMyIndustryList,
    {
      select,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!sessionStorage.getItem("accessToken"),
    }
  )
  console.log(MyIndustryList)

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      {!!MyIndustryList?.length ? (
        <IndustryListWrapper>
          {MyIndustryList?.map((IndustryInfo, key) => {
            return (
              <CardWrapper key={key}>
                <IndustryCard industryInfo={IndustryInfo} />
              </CardWrapper>
            )
          })}
        </IndustryListWrapper>
      ) : (
        <TextWrapper>관심있는 산업 분야를 등록해보세요</TextWrapper>
      )}
    </>
  )
}

export default IndustryList

const IndustryListWrapper = styled.div`
  // position
  position: relative;

  // flex-box
  display: flex;
  gap: 24px;
  align-items: center;
  flex: 1;

  // overflow
  flex-wrap: nowrap;
  overflow-x: auto;

  // size
  height: 28vh;
  width: 100%;

  // margin & padding
  padding: 2px;

  // overflow
  flex-wrap: nowrap;
  overflow-x: auto;

  // scroll bar
  // 아래의 모든 코드는 영역::코드로 사용
  &::-webkit-scrollbar {
    height: 25px; // 스크롤바의 너비
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

const CardWrapper = styled.div`
  margin-top: 2vh;
  min-width: calc(75px + 3vh);
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
