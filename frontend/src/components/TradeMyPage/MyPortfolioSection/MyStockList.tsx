import MyStockItem from "./MyStockItem"
import styled from "styled-components"
import {
  Divider,
  Pagination,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"
import { useState, useEffect } from "react"
import { useMyStockList } from "../../../hooks/useMyStockList"
import { MyStockType } from "../../../hooks/useMyStockList"

const MyStockList = ({ id }: any) => {
  const { data: myStocks } = useMyStockList()
  const [sorter, setSorter] = useState("stockName")
  const [sortedStocks, setSortedStocks] = useState<MyStockType[]>([])

  const handleChange = (event: SelectChangeEvent) => {
    setSorter(() => event.target.value)
  }

  const sortOptions = [
    {
      value: "stockName",
      label: "이름순",
      sortFunc: (a: MyStockType, b: MyStockType) =>
        a.stockName.localeCompare(b.stockName),
    },
    {
      value: "rrp",
      label: "수익률순",
      sortFunc: (a: MyStockType, b: MyStockType) => b.rrp - a.rrp,
    },
    {
      value: "count",
      label: "보유수량순",
      sortFunc: (a: MyStockType, b: MyStockType) => b.count - a.count,
    },
    {
      value: "curStockPrice",
      label: "현재가순",
      sortFunc: (a: MyStockType, b: MyStockType) =>
        a.curStockPrice - b.curStockPrice,
    },
  ]

  // myStockList 정렬 함수
  const sortMyStocks = (list: MyStockType[]) => {
    const selectedOption = sortOptions.find((option) => option.value === sorter)
    if (selectedOption) {
      return list.sort(selectedOption.sortFunc)
    }
    return list
  }

  useEffect(() => {
    if (!myStocks) return
    setSortedStocks([...sortMyStocks(myStocks)])
  }, [sorter, myStocks])

  return (
    <div>
      <HeaderDiv>
        <p>전체 보기</p>
        <FormControl variant="standard">
          <Select value={sorter} onChange={handleChange}>
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </HeaderDiv>

      {sortedStocks?.map((myStock) => {
        return (
          <>
            <MyStockItem myStock={myStock} />
            <Divider style={{ border: "1px solid var(--custom-gray-4)" }} />
          </>
        )
      })}
      {/* <PageIndicator count={Math.floor(myStocks?.length / 5)} shape="rounded" /> */}
    </div>
  )
}

export default MyStockList

const HeaderDiv = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--custom-gray-1);

  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-inline: 3%;

  & .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:after {
    border-bottom: 2px solid var(--custom-purple-3);
  }
`
const PageIndicator = styled(Pagination)`
  padding-block: 4% 2%;
  & > ul {
    justify-content: center;
  }
`
