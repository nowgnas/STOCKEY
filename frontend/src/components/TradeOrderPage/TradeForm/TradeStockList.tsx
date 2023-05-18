import { useState, useEffect, ChangeEvent } from "react"
import styled from "styled-components"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"

import TradeStockTabPanel from "./TradeStockTabPanel"
import TradeStockItem from "./TradeStockItem"
import { Divider, TextField } from "@mui/material"
import { useMyStocks, useWholeStocks } from "../../../hooks/useTradeForm"

export interface TradeStockItemProps {
  item: TradeStockItem
}

interface TradeStockItem {
  id: number
  name: string
  stockNums?: number
  currentPrice: number
  buyPrice?: number
}

const TradeStockList = () => {
  // 나중에 useQuery 사용 전체종목도 해서 넣기
  const { data: myStock } = useMyStocks()
  const { data: wholeStock } = useWholeStocks()
  console.log("wholeStock", wholeStock)
  console.log("myStock", myStock)

  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const [searchInput, setSearchInput] = useState("")
  const [searchData, setSearchData] = useState<TradeStockItem[]>([])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
  }

  useEffect(() => {
    if (!searchInput.trim()) {
      setSearchData([])
      return
    }
    if (value === 0)
      setSearchData(
        myStock.filter((stock: TradeStockItem) => {
          return stock.name.toUpperCase().includes(searchInput.toUpperCase())
        })
      )
    if (value === 1)
      setSearchData(
        wholeStock.filter((stock: TradeStockItem) => {
          return stock.name.toUpperCase().includes(searchInput.toUpperCase())
        })
      )
  }, [searchInput])
  console.log(value)
  return (
    <StockContainer>
      <StockTabs value={value} onChange={handleChange}>
        <Tab label="내 종목" id={`simple-tab-0`} />
        <Tab label="전체 종목" id={`simple-tab-1`} />
      </StockTabs>
      <SearchDiv
        placeholder="검색"
        value={searchInput}
        onChange={handleSearchChange}
      />
      {/* 내 종목 */}
      <TradeStockTabPanel value={value} index={0}>
        {searchInput
          ? searchData.map((stock, index) => {
              return (
                <>
                  <TradeStockItem
                    item={stock}
                    key={`myStock-search-${index}`}
                  />
                  <Divider key={`myStock-search-${index}-divider`} />
                </>
              )
            })
          : myStock &&
            myStock.map((stock: TradeStockItem) => {
              return (
                <>
                  <TradeStockItem item={stock} />
                  <Divider />
                </>
              )
            })}
      </TradeStockTabPanel>
      <TradeStockTabPanel value={value} index={1}>
        {searchInput
          ? searchData.map((stock, index) => {
              return (
                <>
                  <TradeStockItem
                    item={stock}
                    key={`wholeStock-search-${index}`}
                  />
                  <Divider key={`wholeStock-search-${index}-divider`} />
                </>
              )
            })
          : wholeStock &&
            wholeStock.map((stock: TradeStockItem, index: number) => {
              return (
                <>
                  <TradeStockItem
                    item={stock}
                    key={`wholeStock-${stock.name}-${index}`}
                  />
                  <Divider key={`wholeStock-${stock.name}-${index}-divider`} />
                </>
              )
            })}
      </TradeStockTabPanel>
      {/* 전체 종목 */}
    </StockContainer>
  )
}

export default TradeStockList

const StockContainer = styled.section`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 5%;
  border-radius: 24px;
  min-height: 80%;
  max-height: 80%;
`

const StockTabs = styled(Tabs)``

const SearchDiv = styled(TextField)`
  margin-top: 10px !important;
  & > .MuiInputBase-root {
    border-radius: 24px;
  }

  & > .MuiInputBase-root > input {
    height: 1em;
  }
`

// const MY_STOCK_DUMMY_DATA = [
//   {
//     id: 1,
//     name: "LG에너지솔루션",
//     stockNums: 302,
//     currentPrice: 125000,
//     buyPrice: 127000,
//   },
//   {
//     id: 2,
//     name: "카카오",
//     stockNums: 32,
//     currentPrice: 50000,
//     buyPrice: 23000,
//   },
//   {
//     id: 3,
//     name: "삼성전자",
//     stockNums: 32,
//     currentPrice: 53000,
//     buyPrice: 1000,
//   },
//   {
//     id: 4,
//     name: "naver",
//     stockNums: 32,
//     currentPrice: 125000,
//     buyPrice: 127000,
//   },
//   {
//     id: 1,
//     name: "LG에너지솔루션",
//     stockNums: 302,
//     currentPrice: 125000,
//     buyPrice: 127000,
//   },
//   {
//     id: 2,
//     name: "카카오",
//     stockNums: 32,
//     currentPrice: 50000,
//     buyPrice: 23000,
//   },
//   {
//     id: 3,
//     name: "삼성전자",
//     stockNums: 32,
//     currentPrice: 53000,
//     buyPrice: 1000,
//   },
//   {
//     id: 4,
//     name: "naver",
//     stockNums: 32,
//     currentPrice: 125000,
//     buyPrice: 127000,
//   },
//   {
//     id: 1,
//     name: "LG에너지솔루션",
//     stockNums: 302,
//     currentPrice: 125000,
//     buyPrice: 127000,
//   },
//   {
//     id: 2,
//     name: "카카오",
//     stockNums: 32,
//     currentPrice: 50000,
//     buyPrice: 23000,
//   },
//   {
//     id: 3,
//     name: "삼성전자",
//     stockNums: 32,
//     currentPrice: 53000,
//     buyPrice: 1000,
//   },
//   {
//     id: 4,
//     name: "naver",
//     stockNums: 32,
//     currentPrice: 125000,
//     buyPrice: 127000,
//   },
//   {
//     id: 1,
//     name: "LG에너지솔루션",
//     stockNums: 302,
//     currentPrice: 125000,
//     buyPrice: 127000,
//   },
//   {
//     id: 2,
//     name: "카카오",
//     stockNums: 32,
//     currentPrice: 50000,
//     buyPrice: 23000,
//   },
//   {
//     id: 3,
//     name: "삼성전자",
//     stockNums: 32,
//     currentPrice: 53000,
//     buyPrice: 1000,
//   },
//   {
//     id: 4,
//     name: "naver",
//     stockNums: 32,
//     currentPrice: 125000,
//     buyPrice: 127000,
//   },
// ]
