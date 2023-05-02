import { SectionWrapper } from "../../common/Background/SectionWrapper"
import MyAccountCard from "./MyAccountCard"
import MyStockList from "./MyStockList"
import MyStockPieChart from "./MyStockPieChart"

const MyPortfolioSection = () => {
  return (
    <SectionWrapper pt={3} pb={3} pl={2} pr={2} bgColor="white">
      <MyAccountCard />
      <MyStockPieChart />
      <MyStockList />
    </SectionWrapper>
  )
}

export default MyPortfolioSection
