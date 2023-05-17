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
import { useState } from "react"
import { useMyStockList } from "../../../hooks/useMyStockList"

const MyStockList = ({ id }: any) => {
  const { data: myStocks } = useMyStockList()

  const dummyData = [1, 2, 3, 4, 5]
  const [sorter, setSorter] = useState("1")
  const handleChange = (event: SelectChangeEvent) => {
    setSorter(event.target.value)
  }

  return (
    <div>
      <HeaderDiv>
        <p>전체 보기</p>
        <FormControl variant="standard">
          <Select value={sorter} onChange={handleChange}>
            <MenuItem value={1}>이름순</MenuItem>
            <MenuItem value={2}>수익률순</MenuItem>
            <MenuItem value={3}>보유수량순</MenuItem>
            <MenuItem value={4}>현재가순</MenuItem>
          </Select>
        </FormControl>
      </HeaderDiv>
      {dummyData.map((_, index) => {
        return (
          <>
            <MyStockItem
              key={index}
              id={4}
              name="카카오"
              quantity={5}
              currentPrice={248500}
              returnRate={0.66}
            />
            <Divider style={{ border: "1px solid var(--custom-gray-4)" }} />
          </>
        )
      })}
      <PageIndicator count={5} shape="rounded" />
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
