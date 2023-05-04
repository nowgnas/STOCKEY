import { SectionWrapper } from "../../common/Background/SectionWrapper"
import MyAccountCard from "./MyAccountCard"
import MyStockList from "./MyStockList"
import MyStockPieChart from "./MyStockPieChart"

const MyPortfolioSection = () => {
  return (
    <SectionWrapper pt={2} pb={1} pl={2} pr={2} bgColor="white">
      <MyAccountCard total={54828000} stock={12014000} deposit={42814000} />
      <MyStockPieChart />
      <MyStockList id="my-stock-list" />
    </SectionWrapper>
  )
}

export default MyPortfolioSection
