import { useState } from "react"
import styled from "styled-components"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"

import TradeStockTabPanel from "./TradeStockTabPanel"
import TradeStockItem from "./TradeStockItem"
import { Divider } from "@mui/material"

// 나중에 useQuery 사용 전체종목도 해서 넣기
const MY_STOCK_DUMMY_DATA = [
  {
    name: "naver",
    industry: "IT",
    currentPrice: 125000,
    buyPrice: 127000,
    buyPop: 3,
    sellPop: 73,
  },
  {
    name: "카카오",
    industry: "IT",
    currentPrice: 50000,
    buyPrice: 23000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    name: "삼성전자",
    industry: "반도체",
    currentPrice: 53000,
    buyPrice: 1000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    name: "naver",
    industry: "IT",
    currentPrice: 125000,
    buyPrice: 127000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    name: "카카오",
    industry: "IT",
    currentPrice: 50000,
    buyPrice: 23000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    name: "삼성전자",
    industry: "반도체",
    currentPrice: 53000,
    buyPrice: 1000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    name: "naver",
    industry: "IT",
    currentPrice: 125000,
    buyPrice: 127000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    name: "카카오",
    industry: "IT",
    currentPrice: 50000,
    buyPrice: 23000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    name: "삼성전자",
    industry: "반도체",
    currentPrice: 53000,
    buyPrice: 1000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    name: "naver",
    industry: "IT",
    currentPrice: 125000,
    buyPrice: 127000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    name: "카카오",
    industry: "IT",
    currentPrice: 50000,
    buyPrice: 23000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    name: "삼성전자",
    industry: "반도체",
    currentPrice: 53000,
    buyPrice: 1000,
    buyPop: 72,
    sellPop: 73,
  },
]

const TradeStockList = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <StockContainer>
      <StockTabs value={value} onChange={handleChange}>
        <Tab label="내 종목" id={`simple-tab-0`} />
        <Tab label="전체 종목" id={`simple-tab-1`} />
      </StockTabs>
      <Divider />
      {/* 내 종목 */}
      <TradeStockTabPanel value={value} index={0}>
        {MY_STOCK_DUMMY_DATA.map((stock) => {
          return (
            <>
              <TradeStockItem
                name={stock.name}
                industry={stock.industry}
                currentPrice={stock.currentPrice}
                buyPrice={stock.buyPrice}
                buyPop={stock.buyPop}
                sellPop={stock.sellPop}
              />
              <Divider />
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
