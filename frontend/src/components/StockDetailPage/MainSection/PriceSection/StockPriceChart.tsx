// 차트 관련
import * as Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import highchartsStock from "highcharts/modules/stock"
import dayjs from "dayjs"

//  동작 관련
import { useEffect, useState } from "react"

// 데이터 관련
import { useParams } from "react-router-dom"
import { useStockPriceList } from "../../../../hooks/useStockPriceList"
import { useStockDetail } from "../../../../hooks/useStockDetail"
import { useRecoilState } from "recoil"
import { keywordAnalysisParamsState } from "../../../../stores/StockDetailAtoms"

// 컴포넌트 관련
import { ChartWrapper } from "../../SubPanel/KeywordPanel/KeywordChart"
import Spinner from "../../../common/Spinner/Spinner"

highchartsStock(Highcharts)
Highcharts.setOptions({
  lang: {
    rangeSelectorZoom: "",
    shortMonths: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    weekdays: ["일", "월", "화", "수", "목", "금", "토"],
    rangeSelectorFrom: "분석 기간 : ",
    rangeSelectorTo: "⁓",
  },
})

const StockPriceChart = () => {
  const params = useParams()
  const stockId = Number(params?.stockId)
  const { isLoading, data: stockPriceData } = useStockPriceList(
    stockId ? stockId : 0
  )
  const { data: stockDetailData } = useStockDetail(stockId)
  const [keywordAnalysisParams, setKeywordAnalysisParams] = useRecoilState(
    keywordAnalysisParamsState
  )

  const [chartWidth, setChartWidth] = useState<number>(400)
  const handleResize = () => {
    const chartWrapper = document.getElementById("stock-price-chart")
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

  const [isCandle, setIsCandle] = useState<boolean>(false)
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({})
  useEffect(() => {
    setChartOptions({
      chart: {
        borderColor: "var(--custom-background)",
        borderRadius: 20,
        borderWidth: 2,
        margin: 20,
        animation: true,
        zooming: {
          type: "x",
        },
        width: chartWidth,
      },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: {
          day: "%b %e일",
          week: "%b %e일",
          month: "%y년 %b",
          year: "%Y",
        },
        labels: {
          step: 1,
        },
        events: {
          afterSetExtremes: function (this, event) {
            console.log("fired!")
            setKeywordAnalysisParams({
              ...keywordAnalysisParams,
              typeId: stockId,
              startDate: dayjs(event.min).format("YYMMDD"),
              endDate: dayjs(event.max).format("YYMMDD"),
            })
          },
        },
      },
      yAxis: {
        type: "linear",
      },
      credits: {
        enabled: false,
      },
      scrollbar: {
        enabled: false,
      },
      rangeSelector: {
        allButtonsEnabled: false,
        buttons: [
          {
            type: "day",
            count: 1,
            text: "1일",
          },
          {
            type: "week",
            count: 1,
            text: "1주",
          },
          {
            type: "month",
            count: 1,
            text: "1개월",
          },
          {
            type: "year",
            count: 1,
            text: "1년",
          },
          {
            type: "all",
            text: "전체",
          },
        ],
        selected: 5,
        inputDateFormat: "%Y.%m.%d",
        inputEditDateFormat: "%Y.%m.%d",
        inputBoxHeight: 20,
        inputStyle: {
          color: "var(--custom-black)",
          fontSize: "1.4rem",
          fontWeight: "bold",
          borderWidth: 0,
        },
        buttonTheme: {
          width: 40,
          r: 8,
          style: {
            color: "var(--custom-black)",
            fontWeight: "bold",
            borderWidth: 0,
          },
          states: {
            select: {
              fill: "#D1F7EB",
            },
          },
        },
      },
      tooltip: {
        split: false,
        valueDecimals: 0,
        valueSuffix: "원",
        useHTML: true,
        formatter: function (this: any) {
          return this.points.reduce(function (initialValue: any, point: any) {
            return (
              initialValue +
              "<hr/>" +
              '<span style="color:' +
              point.series.color +
              '"><b>' +
              point.series.name +
              "</b></span>&nbsp;&nbsp;<span><b>" +
              point.y.toLocaleString("ko-KR") +
              "원</b></span>"
            )
          }, "<p style='margin: 0; font-style: italic'><b>" +
            dayjs(this.x).format("YYYY-MM-DD") +
            "</b></p>")
        },
        shared: true,
      },
      navigator: {
        enabled: true,
        handles: {
          backgroundColor: "var(--custom-purple-2)",
          borderColor: "var(--custom-black)",
          height: 20,
        },
        height: 60,
        margin: 30,
        maskFill: "rgba(212, 193, 255, 0.4)",
      },
      plotOptions: {
        line: {
          cursor: "pointer",
          events: {
            // drag: function (this: any, event: any) {
            //   // this.xAxis.plotLinesAndBands[0].options.from = event.point.x
            //   console.log(this.series.flags)
            //   // this.chart.redraw()
            // }, // ??
            // click: function (this: any, event: any) {
            //   // this.xAxis.plotLinesAndBands[0].options.from = event.point.x
            //   console.log(this.series.flags)
            //   this.chart.redraw()
            // },
          },
          showInLegend: false,
          showInNavigator: true,
        },
        candlestick: {
          showInLegend: false,
          showInNavigator: true,
        },
      },
      series: [
        {
          id: stockDetailData?.name,
          name: stockDetailData?.name,
          type: "line",
          data: stockPriceData,
          color: "var(--custom-green-1)",
          shadow: true,
        },
        // {
        //   type: "flags",
        //   name: "Flags on series",
        //   data: [
        //     {
        //       x: Date.UTC(2017, 6, 1),
        //       title: "시작",
        //     },
        //     {
        //       x: Date.UTC(2017, 8, 1),
        //       title: "끝",
        //     },
        //   ],
        //   onSeries: "NAVER",
        //   shape: "squarepin",
        //   // cursor: "pointer",
        //   // dragDrop: {
        //   //   draggableX: true,
        //   //   draggableY: false,
        //   // },
        // },
      ],
    })
  }, [
    stockPriceData,
    stockDetailData,
    chartWidth,
    stockId,
    keywordAnalysisParams,
    setKeywordAnalysisParams,
  ])

  const handleChartType = () => {
    if (!isCandle) {
      setChartOptions({
        series: [
          {
            type: "candlestick",
          },
        ],
      })
    } else {
      setChartOptions({
        series: [
          {
            type: "line",
          },
        ],
      })
    }
    setIsCandle(!isCandle)
  }

  return (
    <ChartWrapper id="stock-price-chart">
      {/* <button onClick={handleChartType}>
        {isCandle ? "간단히" : "자세히"}
      </button> */}
      {isLoading ? (
        <Spinner />
      ) : (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={chartOptions}
        />
      )}
    </ChartWrapper>
  )
}

export default StockPriceChart
