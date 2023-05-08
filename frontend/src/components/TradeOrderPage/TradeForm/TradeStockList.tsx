import { useState } from "react"
import styled from "styled-components"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"

import TradeStockTabPanel from "./TradeStockTabPanel"
import TradeStockItem from "./TradeStockItem"
import { Divider } from "@mui/material"

export interface TradeStockItemProps {
  item: {
    name: string
    stockNums: number
    currentPrice: number
    buyPrice?: number
    buyPop: number
    sellPop: number
  }
}

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
              <TradeStockItem item={stock} />
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

// 나중에 useQuery 사용 전체종목도 해서 넣기
const MY_STOCK_DUMMY_DATA = [
  {
    id: 1,
    name: "LG에너지솔루션",
    stockNums: 302,
    currentPrice: 125000,
    buyPrice: 127000,
    buyPop: 3,
    sellPop: 73,
  },
  {
    id: 2,
    name: "카카오",
    stockNums: 32,
    currentPrice: 50000,
    buyPrice: 23000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    id: 3,
    name: "삼성전자",
    stockNums: 32,
    currentPrice: 53000,
    buyPrice: 1000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    id: 4,
    name: "naver",
    stockNums: 32,
    currentPrice: 125000,
    buyPrice: 127000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    id: 1,
    name: "LG에너지솔루션",
    stockNums: 302,
    currentPrice: 125000,
    buyPrice: 127000,
    buyPop: 3,
    sellPop: 73,
  },
  {
    id: 2,
    name: "카카오",
    stockNums: 32,
    currentPrice: 50000,
    buyPrice: 23000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    id: 3,
    name: "삼성전자",
    stockNums: 32,
    currentPrice: 53000,
    buyPrice: 1000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    id: 4,
    name: "naver",
    stockNums: 32,
    currentPrice: 125000,
    buyPrice: 127000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    id: 1,
    name: "LG에너지솔루션",
    stockNums: 302,
    currentPrice: 125000,
    buyPrice: 127000,
    buyPop: 3,
    sellPop: 73,
  },
  {
    id: 2,
    name: "카카오",
    stockNums: 32,
    currentPrice: 50000,
    buyPrice: 23000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    id: 3,
    name: "삼성전자",
    stockNums: 32,
    currentPrice: 53000,
    buyPrice: 1000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    id: 4,
    name: "naver",
    stockNums: 32,
    currentPrice: 125000,
    buyPrice: 127000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    id: 1,
    name: "LG에너지솔루션",
    stockNums: 302,
    currentPrice: 125000,
    buyPrice: 127000,
    buyPop: 3,
    sellPop: 73,
  },
  {
    id: 2,
    name: "카카오",
    stockNums: 32,
    currentPrice: 50000,
    buyPrice: 23000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    id: 3,
    name: "삼성전자",
    stockNums: 32,
    currentPrice: 53000,
    buyPrice: 1000,
    buyPop: 72,
    sellPop: 73,
  },
  {
    id: 4,
    name: "naver",
    stockNums: 32,
    currentPrice: 125000,
    buyPrice: 127000,
    buyPop: 72,
    sellPop: 73,
  },
]
