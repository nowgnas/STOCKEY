import * as Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useEffect, useState } from "react"
import SandSignika from "highcharts/themes/sand-signika"
import styled from "styled-components"

interface ChartProps {
  chartOptions: HighchartsReact.Props
  height: string
}

const ChartWrapper = ({ chartOptions, height }: ChartProps) => {
  const [chartWidth, setChartWidth] = useState<number>(754)
  const handleResize = () => {
    const chartWrapperDiv = document.getElementById("chart-wrapper")
    if (chartWrapperDiv) {
      setChartWidth(chartWrapperDiv.clientWidth)
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  SandSignika(Highcharts)

  return (
    <ChartWrapperDiv id="chart-wrapper" h={height}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </ChartWrapperDiv>
  )
}

export default ChartWrapper

export const ChartWrapperDiv = styled.div<{ h: string }>`
  width: 100%;
  height: ${({ h }) => h};
  & * {
    font-family: "Inter";
  }
  & div {
    height: 100%;
  }
  & svg {
    width: 100% !important;
  }
  & .custom-label {
    text-align: center;
  }
  & .custom-label span {
  }
  & .custom-label .label-title {
    color: var(--custom-black);
    font-weight: bolder;
    font-size: 2.2rem;
    text-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
    margin-bottom: 0;
  }
  & .custom-label .label-value {
    font-size: 1.6rem;
    color: #605d62;
    margin-block: 0.5rem;
  }
  & .custom-label .label-rank {
    font-size: 5rem;
    color: white;
    font-style: oblique;
    font-weight: extra-bold;
    text-shadow: rgba(0, 0, 0, 0.3) 0px 4px 4px;
    margin-block: 0
    `
