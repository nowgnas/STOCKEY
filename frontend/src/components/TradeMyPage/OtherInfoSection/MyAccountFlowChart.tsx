import { GraphWrapper } from "../../StockDetailPage/MainSection/KeywordSection/KeywordBarGraphInDetail"
import * as Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useEffect, useState } from "react"
import SandSignika from "highcharts/themes/sand-signika"
import dayjs from "dayjs"
import "dayjs/locale/ko"
dayjs.locale("ko")
const MyAccountFlowChart = () => {
  const thisMonday = dayjs().day(1)
  const thisTuesday = dayjs().day(2)
  const thisWednesday = dayjs().day(3)
  const thisThursday = dayjs().day(4)
  const thisFriday = dayjs().day(5)

  const [chartWidth, setChartWidth] = useState<number>(754)
  const handleResize = () => {
    const chartWrapper = document.getElementById("account-flow-chart")
    if (chartWrapper) {
      setChartWidth(chartWrapper.clientWidth)
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({})
  SandSignika(Highcharts)

  useEffect(() => {
    setChartOptions({
      chart: {
        type: "column",
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "",
      },
      xAxis: {
        type: "category",
      },
      yAxis: {
        title: {
          text: "",
        },
        stackLabels: {
          animation: true,
          enabled: true,
          formatter: function () {
            return `${this.total.toLocaleString()}`
          },
          y: -10,
          style: {
            fontWeight: "bold",
            fontSize: "14px",
          },
        },
      },
      legend: {
        align: "left",
        verticalAlign: "top",
        x: 0,
        y: 0,
        floating: true,
        backgroundColor: "var(--custom-background)",
        borderColor: "var(--custom-gray-3)",
        borderWidth: 2,
        shadow: false,
      },
      tooltip: {
        shape: "callout",
        useHTML: true,
        formatter: function () {
          return `<text style="background-color: ${
            this.color
          }; border-radius: 8px; padding: 2px 4px; font-weight: bold;">${
            this.series.name
          }</text><hr/>${this.percentage.toFixed(
            1
          )}%<br/>${this.y?.toLocaleString()}원`
        },
      },
      plotOptions: {
        column: {
          stacking: "normal",
          dataLabels: {
            enabled: true,
            formatter: function () {
              return `${this.y?.toLocaleString()}`
            },
          },
        },
      },
      series: [
        {
          name: "주식",
          type: "column",
          data: [
            {
              name: thisMonday.format("MM.DD (ddd)"),
              y: 200000,
              drilldown: "월요일",
            },
            {
              name: thisTuesday.format("MM.DD (ddd)"),
              y: 410000,
              drilldown: "화요일",
            },
            {
              name: thisWednesday.format("MM.DD (ddd)"),
              y: 330000,
              drilldown: "수요일",
            },
            {
              name: thisThursday.format("MM.DD (ddd)"),
              y: 200000,
              drilldown: "목요일",
            },
            {
              name: thisFriday.format("MM.DD (ddd)"),
              y: 330000,
              drilldown: "금요일",
            },
          ],
          color: "var(--custom-purple-2)",
        },
        {
          name: "예수금",
          type: "column",
          data: [
            {
              name: thisMonday.format("MM.DD (ddd)"),
              y: 450000,
            },
            {
              name: thisTuesday.format("MM.DD (ddd)"),
              y: 140000,
            },
            {
              name: thisWednesday.format("MM.DD (ddd)"),
              y: 250000,
            },
            {
              name: thisThursday.format("MM.DD (ddd)"),
              y: 60000,
            },
            {
              name: thisFriday.format("MM.DD (ddd)"),
              y: 710000,
            },
          ],
          color: "var(--custom-mint)",
        },
      ],
      drilldown: {
        allowPointDrilldown: true,
        activeAxisLabelStyle: {
          textDecoration: "none",
          fontStyle: "italic",
        },
        activeDataLabelStyle: {
          textDecoration: "none",
          fontStyle: "italic",
        },
        series: [
          {
            id: "월요일",
            name: "월요일",
            type: "column",
            data: [
              ["9시", 2000],
              ["10시", 4100],
              ["11시", 3300],
              ["12시", 2000],
              ["13시", 3300],
              ["14시", 2000],
              ["15시", 3300],
            ],
          },
          {
            id: "화요일",
            name: "화요일",
            type: "column",
            data: [
              ["9시", 2000],
              ["10시", 4100],
              ["11시", 3300],
              ["12시", 2000],
              ["13시", 3300],
              ["14시", 2000],
              ["15시", 3300],
            ],
          },
          {
            id: "수요일",
            name: "수요일",
            type: "column",
            data: [
              ["9시", 2000],
              ["10시", 4100],
              ["11시", 3300],
              ["12시", 2000],
              ["13시", 3300],
              ["14시", 2000],
              ["15시", 3300],
            ],
          },
          {
            id: "목요일",
            name: "목요일",
            type: "column",
            data: [
              ["9시", 2000],
              ["10시", 4100],
              ["11시", 3300],
              ["12시", 2000],
              ["13시", 3300],
              ["14시", 2000],
              ["15시", 3300],
            ],
          },
          {
            id: "금요일",
            name: "금요일",
            type: "column",
            data: [
              ["9시", 2000],
              ["10시", 4100],
              ["11시", 3300],
              ["12시", 2000],
              ["13시", 3300],
              ["14시", 2000],
              ["15시", 3300],
            ],
          },
        ],
      },
    })
  }, [setChartOptions])

  return (
    <GraphWrapper id="account-flow-chart">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </GraphWrapper>
  )
}

export default MyAccountFlowChart
