import * as Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import dayjs from "dayjs"
import styled from "styled-components"
import { useKeywordFrequency } from "../../../../hooks/useKeywordFrequency"
import { useRecoilValue } from "recoil"
import { useState, useEffect } from "react"
import { keywordAnalysisParamsState } from "../../../../stores/StockDetailAtoms"
import { KeywordPanelProps } from "./KeywordPanel"
// import { useStockPriceList } from "../../../../hooks/useStockPriceList"
// import { useParams } from "react-router"

Highcharts.setOptions({
  lang: {
    resetZoom: "전체 기간 보기",
  },
})

const KeywordChart = ({ keywordId, keyword }: KeywordPanelProps) => {
  // const params = useParams()
  // const stockId = Number(params?.stockId)
  const { data: keywordFrequency } = useKeywordFrequency(keywordId)
  const keywordAnalysisParams = useRecoilValue(keywordAnalysisParamsState)
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({})

  useEffect(() => {
    setChartOptions({
      chart: {
        type: "areaspline",
        zooming: {
          type: "x",
        },
        backgroundColor: "transparent",
      },
      credits: {
        enabled: false,
      },
      title: {
        text: undefined,
        align: "left",
        style: {
          fontSize: "1.6rem",
          color: "black",
          fontWeight: "bold",
        },
      },

      xAxis: {
        type: "datetime",
        crosshair: true,
        // plotBands: [
        //   {
        //     // color: "var(--custom-mint)",
        //     from: new Date("220303").getTime(),
        //     to: new Date("220401").getTime(),
        //   },
        // ],
        labels: {
          formatter: function (this: any) {
            return dayjs(this.value).format("M월 D일")
          },
        },
      },
      yAxis: {
        title: {
          text: null,
        },
        gridLineWidth: 1,
        labels: {
          formatter: function (this: any) {
            return this.value + "개"
          },
        },
      },
      legend: {
        layout: "vertical",
        align: "left",
        verticalAlign: "top",
        x: 40,
        y: 0,
        floating: true,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "transparent",
        shadow: false,
        itemStyle: {
          color: "black",
          fontWeight: "bold",
          fontSize: "1.2rem",
        },
      },
      tooltip: {
        shared: false,
        useHTML: true,
        formatter: function (this: any) {
          console.log(this)
          if (this.series.index === 0) {
            return (
              "<b>" +
              dayjs(this.point.x).format("YY/MM/DD") +
              "</b><hr/>" +
              `<span style="color: ${this.series.color}"><b>"` +
              this.series.name +
              '"</b></span> 관련 기사 ' +
              "<b>" +
              this.point.y +
              "개</b> "
            )
          } else {
            return (
              "<b>" + this.series.name + "</b><br/><br/>" + this.point.y + "원"
            )
          }
        },
      },
      series: [
        {
          name: keyword,
          type: "areaspline",
          data: keywordFrequency,
          color: "var(--custom-blue)",
          lineColor: "#2979ff",
        },
        // {
        //   name: "삼성바이오로직스",
        //   data: [
        //     29.9, 16.4, 59.2, 34.0, 26.0, 35.6, 41.5, 19.4, 14.1, 54.4, 29.9,
        //     31.5, 46.4, 19.2, 44.0, 16.0, 21.5, 35.6, 48.5, 36.4, 64.4, 29.9,
        //     51.5, 16.4, 19.2, 44.0, 26.0, 35.6, 28.5, 16.4,
        //   ].map((value, index) => {
        //     return [today.valueOf() - index * 24 * 3600 * 1000, value]
        //   }),
        //   lineWidth: 4,
        //   lineColor: "#ffd600",
        //   // fillColor: "#fff59d",
        //   color: "#ffd600",
        //   fillColor: "transparent",
        //   // linecap: "square",
        // },
      ],
      plotOptions: {
        areaspline: {
          lineWidth: 2.5,
          linecap: "square",
          marker: {
            enabled: false,
            symbol: "circle",
            radius: 2,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
          opacity: 0.4,
        },
      },
    })
  }, [keywordFrequency, keywordAnalysisParams, keyword])

  return (
    <ChartWrapper>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </ChartWrapper>
  )
}
export default KeywordChart

export const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
`
