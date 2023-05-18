import styled from "styled-components"
// useQuery
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
// import { accessTokenState } from "../../../stores/atoms"
import customAxios from "../../../utils/customAxios"
// sub component
import StockAxis from "./StockAxis"
import StockGraphBar from "./StockGraphBar"
import Spinner from "../../common/Spinner/Spinner"
import { useEffect } from "react"

export interface MyStockType {
  id: number
  name: string
  price: number
  rate: number
}

const StockGraph = () => {
  // accessTokenState
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  // useNavigate
  const navigate = useNavigate()
  // customAxios
  const axios = customAxios({ isAuthNeeded: true, navigate: navigate })

  // useQuery: getMyStockList
  const fetchMyStockList = () => {
    return axios.get("/stock/my")
  }
  const select = (response: any) => {
    const data: MyStockType[] = response.data.data
    return data
  }
  const {
    isLoading,
    data: MyStockList,
    refetch,
  } = useQuery("getMyStockList", fetchMyStockList, {
    refetchOnWindowFocus: false,
    cacheTime: 0,
    staleTime: 0,
    retry: false,
    select,
  })

  useEffect(() => {
    refetch()
  }, [])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      {!!MyStockList?.length ? (
        <GraphWrapper>
          <StockAxis />
          <BarWrapper>
            {MyStockList?.map((stock, key) => {
              return (
                <StockGraphBar
                  key={key}
                  price={stock.price}
                  rate={stock.rate}
                  name={stock.name}
                  stockId={stock.id}
                />
              )
            })}
          </BarWrapper>
        </GraphWrapper>
      ) : (
        <TextWrapper>관심있는 주식 종목을 등록해보세요</TextWrapper>
      )}
    </>
  )
}

export default StockGraph

const GraphWrapper = styled.div`
  // flex-box
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 36px;

  // padding & margin
  margin-top: 12px;

  // position
  position: relative;

  // size
  height: 30vh;
`

const BarWrapper = styled.div`
  // position
  position: relative;

  // flex-box
  display: flex;
  gap: 36px;
  flex: 1;

  // overflow
  flex-wrap: nowrap;
  overflow-x: auto;

  // size
  width: calc(100% - 50px);
  min-width: 100px;

  // scroll bar
  // 아래의 모든 코드는 영역::코드로 사용
  &::-webkit-scrollbar {
    height: 25px; // 스크롤바의 너비
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 30px;
    border: 10px solid #ffffff;
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
  font-size: 3rem;
  font-weight: bold;
  color: var(--custom-black);
`
