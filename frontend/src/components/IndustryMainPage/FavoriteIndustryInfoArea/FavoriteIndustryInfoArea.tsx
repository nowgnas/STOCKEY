import styled from "@emotion/styled"
import FavoriteIndustryCardList from "./FavoriteIndustryCardList"
import { nicknameState } from "../../../stores/atoms"
import customAxios from "../../../utils/customAxios"
import { useQuery } from "react-query"
import Spinner from "../../common/Spinner/Spinner"
import { useRecoilState, useRecoilValue } from "recoil"
import { HighlightedSpan } from "../../StockDetailPage/MainSection/PriceSection/PriceSection"

export interface MyIndustryType {
  id: number
  name: string
  description: string
  category: string
}

const FavoriteIndustryInfoArea = () => {
  const nickname = useRecoilValue(nicknameState)
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const axios = customAxios({ isAuthNeeded: true })
  const fetchMyIndustryList = () => {
    return axios.get("/industry/stocklist/my")
  }
  const select = (response: any) => {
    const data: MyIndustryType[] = response.data.data
    return data
  }
  const { isLoading, data: myIndustryList } = useQuery(
    "myIndustry",
    fetchMyIndustryList,
    {
      refetchOnWindowFocus: false,
      select,
      retry: false,
      enabled: !!sessionStorage.getItem("accessToken"),
    }
  )
  return (
    <AreaDiv>
      <TitleDiv>
        {!!nickname ? (
          <span>
            <HighlightedSpan color="var(--custom-gradient-pink)">
              {nickname}
            </HighlightedSpan>
            {" 님의"}
          </span>
        ) : (
          ""
        )}
        관심 산업
      </TitleDiv>
      {isLoading ? (
        <Spinner />
      ) : myIndustryList ? (
        <FavoriteIndustryCardList myIndustryList={myIndustryList} />
      ) : (
        <DefaultPhrase>
          {!!nickname ? "" : "로그인 후 "}관심 산업을 등록해보세요.
        </DefaultPhrase>
      )}
    </AreaDiv>
  )
}

export default FavoriteIndustryInfoArea

const AreaDiv = styled.div`
  min-width: 500px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 0px;
  background: var(--custom-background);
  border-radius: 24px;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15);
  filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.3));
`

const TitleDiv = styled.div`
  height: 2rem;
  width: auto;
  padding: 0px 24px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2rem;
  /* or 83% */

  display: flex;
  align-items: center;
  letter-spacing: 0.1px;

  white-space: pre;
`

const DefaultPhrase = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 10%;
  font-size: 2rem;
  color: gray;
`
