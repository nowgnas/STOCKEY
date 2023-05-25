import * as Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import highchartsStock from "highcharts/modules/stock"
import styled from "styled-components"
import { makePriceFormat } from "../../IndustryMainPage/makePriceFormat"
import { useIndustryMarketCap } from "../../../hooks/useIndustryMarketCap"
import Spinner from "../../common/Spinner/Spinner"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { HighlightedSpan } from "../../StockDetailPage/MainSection/PriceSection/PriceSection"
import dayjs from "dayjs"
import { keywordAnalysisParamsState } from "../../../stores/StockDetailAtoms"
import { useRecoilState } from "recoil"

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
    rangeSelectorTo: "⁓",
  },
})

const IndustryMarketCapLineChart = ({ industryId }: { industryId: number }) => {
  const { isLoading, data: lineChartData } = useIndustryMarketCap(industryId)
  const params = useParams()
  const stockName = params?.industryName
  const [keywordAnalysisParams, setKeywordAnalysisParams] = useRecoilState(
    keywordAnalysisParamsState
  )

  const [chartHeight, setChartHeight] = useState<number>(300)
  const [chartWidth, setChartWidth] = useState<number>(500)
  const handleResize = () => {
    const chartWrapper = document.getElementById("line-chart")
    if (chartWrapper) {
      setChartHeight(chartWrapper.clientHeight)
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

  const options: Highcharts.Options = {
    chart: {
      borderColor: "var(--custom-background)",
      borderRadius: 20,
      borderWidth: 2,
      margin: 20,
      animation: true,
      zooming: {
        type: "x",
      },
      backgroundColor: "transparent",
      height: chartHeight,
      width: chartWidth,
    },
    credits: {
      enabled: false,
    },
    navigator: {
      enabled: true,
      handles: {
        backgroundColor: "var(--custom-purple-3)",
        borderColor: "var(--custom-purple-1)",
        height: 20,
      },
      height: 60,
      margin: 30,
      maskFill: "rgba(120, 120, 120, 0.4)",
    },
    plotOptions: {},
    rangeSelector: {
      allButtonsEnabled: false,
      buttons: [
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
      },
      buttonTheme: {
        width: 40,
        r: 8,
        style: {
          color: "var(--custom-black)",
          fontWeight: "bold",
        },
        states: {
          select: {
            fill: "#D1F7EB",
          },
        },
      },
    },
    scrollbar: {
      enabled: false,
    },
    series: [
      {
        name: stockName,
        type: "line",
        data: lineChartData,
        color: "var(--custom-mint)",
      },
    ],
    title: {
      text: "",
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
            typeId: -1,
            newsType: "ECONOMY",
            startDate: dayjs(event.min).format("YYMMDD"),
            endDate: dayjs(event.max).format("YYMMDD"),
          })
        },
      },
    },
    yAxis: {
      type: "linear",
      labels: {
        formatter: function (this: any) {
          let result: string
          if (this.value >= 1000000000000) {
            result = Math.round(this.value / 1000000000000).toString() + "조"
          } else {
            result = Math.round(this.value / 100000000).toString() + "억"
          }
          return result
        },
      },
    },
  }

  return (
    <AreaDiv>
      <TitleDiv>
        <HighlightedSpan color="var(--custom-mint)">키워드</HighlightedSpan>로
        보는 산업 규모
      </TitleDiv>
      <ChartWrapper id="line-chart">
        {isLoading ? (
          <Spinner />
        ) : (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={options}
          />
        )}
      </ChartWrapper>
    </AreaDiv>
  )
}

export default IndustryMarketCapLineChart

const ChartWrapper = styled.div`
  min-height: 350px;
  height: 25vh;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
  background-color: var(--custom-background);
`

const AreaDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const TitleDiv = styled.div`
  height: 2.4rem;
  width: auto;
  padding: 0px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 2.4rem;
  line-height: 2.4rem;
  /* or 83% */

  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
`
