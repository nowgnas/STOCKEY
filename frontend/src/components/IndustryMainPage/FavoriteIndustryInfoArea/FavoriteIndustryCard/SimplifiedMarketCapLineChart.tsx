import { LineChartDataType } from "../../../../hooks/useIndustryMarketCap"
import * as Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import highchartsStock from "highcharts/modules/stock"
import styled from "styled-components"
import { makePriceFormat } from "../../makePriceFormat"

highchartsStock(Highcharts)

interface ChartProps {
  industryName: string
  data: LineChartDataType
  chartWidth: number
}

const SimplifiedMarketCapLineChart = ({
  industryName,
  data,
  chartWidth,
}: ChartProps) => {
  const options: Highcharts.Options = {
    chart: {
      backgroundColor: "transparent",
      height: 96,
      width: chartWidth,
    },
    credits: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    rangeSelector: {
      enabled: false,
    },
    plotOptions: {
      line: {},
    },
    series: [
      {
        name: industryName,
        type: "line",
        data: data,
        color: "var(--custom-mint)",
      },
    ],
    xAxis: {
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      labels: {
        enabled: false,
      },
    },
    scrollbar: {
      enabled: false,
    },
    tooltip: {
      split: false,
      formatter: function (this: any) {
        let tooltipContent =
          Highcharts.dateFormat("%Y년 %m월 %d일", this.x) + "<br>"
        tooltipContent += `<b>${makePriceFormat(this.y)}</b><br/>`

        const index =
          this.series.points.findIndex((point: any) => {
            return point.x === this.x
          }) - 1

        if (index >= 0) {
          const prevPoint = this.series.points[index]
          const rate =
            Math.round(((this.y - prevPoint.y) / prevPoint.y) * 10000) / 100

          tooltipContent += `전 날 대비 <span style="color:${
            rate > 0 ? "red" : rate === 0 ? "black" : "blue"
          }">${
            rate > 0 ? "▲" + rate + "%" : rate === 0 ? "=" : "▼" + rate + "%"
          }</span><br/>`
        }

        return tooltipContent
      },
    },
  }
  return (
    <ChartWrapper>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </ChartWrapper>
  )
}

export default SimplifiedMarketCapLineChart

const ChartWrapper = styled.div`
  height: 100%;
  width: 100%;
`
