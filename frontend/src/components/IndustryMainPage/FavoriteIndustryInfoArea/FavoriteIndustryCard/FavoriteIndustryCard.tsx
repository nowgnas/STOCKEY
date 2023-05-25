import styled from "styled-components"
import { useIndustryMarketCap } from "../../../../hooks/useIndustryMarketCap"
import SimplifiedMarketCapLineChart from "./SimplifiedMarketCapLineChart"
import Spinner from "../../../common/Spinner/Spinner"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface CardProps {
  industryName: string
  industryId: number
}

const FavoriteIndustryCard = ({ industryName, industryId }: CardProps) => {
  const { data: industryMarketCap } = useIndustryMarketCap(industryId)

  const [rate, setRate] = useState<number>(0)
  useEffect(() => {
    if (industryMarketCap?.length && industryMarketCap.length > 1) {
      const newRate =
        ((industryMarketCap[industryMarketCap.length - 1][1] -
          industryMarketCap[industryMarketCap.length - 2][1]) /
          industryMarketCap[industryMarketCap.length - 2][1]) *
        100
      setRate(Math.round(newRate * 100) / 100)
    }
  }, [industryMarketCap])

  const navigate = useNavigate()
  const handleClickCard = () => {
    navigate(`/industry/${industryName}`)
  }

  const [isHovering, setIsHovering] = useState<boolean>(false)
  const handleMouseOver = () => {
    setIsHovering(true)
  }
  const handleMouseOut = () => {
    setIsHovering(false)
  }

  const [chartWidth, setChartWidth] = useState<number>(0)
  const chartContainer = document.getElementById("chart")
  useEffect(() => {
    if (chartContainer) {
      setChartWidth(chartContainer.clientWidth - 48)
    }
  }, [chartContainer])

  return (
    <LocationDiv onClick={handleClickCard}>
      <CardDiv onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <DefaultContentDiv>
          <IndustryLogoImg
            src={`/industryLogos/${industryName}.png`}
            alt="logo"
          />
          <IndustryNameDiv>{industryName}</IndustryNameDiv>
          <FluctuationDiv value={rate}>
            {rate > 0 ? "▲" + rate : rate < 0 ? "▼" + rate : rate}%
          </FluctuationDiv>
        </DefaultContentDiv>
        <FluctuationChart id="chart" className={isHovering ? "active" : ""}>
          {industryMarketCap ? (
            <SimplifiedMarketCapLineChart
              industryName={industryName}
              data={industryMarketCap}
              chartWidth={chartWidth}
            />
          ) : (
            <Spinner />
          )}
        </FluctuationChart>
      </CardDiv>
    </LocationDiv>
  )
}

export default FavoriteIndustryCard

const LocationDiv = styled.div`
  display: flex;
  width: calc((100% - 24px) / 2);
  height: 48px;
  &:hover {
    cursor: pointer;
  }
`

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 48px;

  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 24px;

  // 카드 확장 애니메이션
  transition: height 0.5s;
  &:hover {
    position: relative;
    z-index: 1;
    height: 192px;
    background: rgba(255, 255, 255, 1);
  }
`

const DefaultContentDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 18px 6px 6px;
  margin: 0px;
  gap: 12px;
`

const IndustryLogoImg = styled.img`
  width: 36px;
  height: 36px;
`

const IndustryNameDiv = styled.div`
  flex-grow: 1;
  height: 1.5rem;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.5rem;
`

const FluctuationDiv = styled.div<{ value: number }>`
  flex-grow: 1;
  height: 1.5rem;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.5rem;
  text-align: right;

  color: ${({ value }) =>
    value > 0 ? "#FF0000" : value < 0 ? "#4537FF" : "#000000"};
`

const FluctuationChart = styled.div`
  height: 0px;
  padding: 24px;
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s;

  &.active {
    height: 144px;
    visibility: visible;
    opacity: 1;
  }
`
