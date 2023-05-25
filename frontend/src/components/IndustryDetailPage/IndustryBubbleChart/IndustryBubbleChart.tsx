import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useBubbleChartSeries } from "../../../hooks/useBubbleChartSeries"
import { useMarketCapRank } from "../../../hooks/useMarketCapRank"
import Spinner from "../../common/Spinner/Spinner"
import { useEffect, useState } from "react"
import { makePriceFormat } from "../../IndustryMainPage/makePriceFormat"
import { HighlightedSpan } from "../../StockDetailPage/MainSection/PriceSection/PriceSection"

require("highcharts/highcharts-more")(Highcharts)

const IndustryBubbleChart = ({ industryId }: { industryId: number }) => {
  const { isLoading, data: marketCapRankList } = useMarketCapRank(
    industryId?.toString()
  )

  const series = useBubbleChartSeries(marketCapRankList)

  const navigate = useNavigate()

  const [chartHeight, setChartHeight] = useState<number>(300)
  const [chartWidth, setChartWidth] = useState<number>(400)
  const handleResize = () => {
    const chartWrapper = document.getElementById("bubble-chart")
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
      type: "packedbubble",
      height: chartHeight,
      width: chartWidth,
      backgroundColor: "transparent",
      borderRadius: 24,
    },
    title: {
      text: "",
    },
    tooltip: {
      useHTML: true,
      formatter: function (this: any) {
        let content =
          "<b style='color: var(--custom-purple-1)'>" +
          this.point.name +
          "</b><br/>"
        const value = makePriceFormat(this.point.value)
        content += "<span>시가총액: " + value.toString() + "</span>"
        return content
      },
    },
    plotOptions: {
      packedbubble: {
        minSize: "60%",
        maxSize: "100%",
        color: "var(--custom-background)",
        layoutAlgorithm: {
          splitSeries: false,
          bubblePadding: 30,
          gravitationalConstant: 0.0005,
          maxSpeed: 0.5,
        },
        showInLegend: false,
        draggable: false,
        dataLabels: {
          enabled: true,
          useHTML: true,
          format:
            '<img style="cursor: pointer;" width="{point.radius}" height="{point.radius}" src="{process.env.PUBLIC_URL}/logo_images/{point.name}.png" alt="#" />',
        },
        marker: {
          fillColor: "white",
          fillOpacity: 1,
          lineColor: "var(--custom-purple-3)",
          lineWidth: 2,
        },
        cursor: "pointer",
        events: {
          click: function (event) {
            navigate(`/stock/${event.point.options.id}`)
          },
        },
        states: {
          inactive: {
            opacity: 0.4,
          },
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: series,
  }
  return (
    <AreaDiv>
      <TitleDiv>
        {"산업 내 시가총액 "}
        <HighlightedSpan color="var(--custom-mint)">TOP 5</HighlightedSpan>
      </TitleDiv>
      <ChartWrapper id="bubble-chart">
        {isLoading ? (
          <Spinner />
        ) : (
          <HighchartsReact highcharts={Highcharts} options={options} />
        )}
      </ChartWrapper>
    </AreaDiv>
  )
}

export default IndustryBubbleChart

const ChartWrapper = styled.div`
  width: 100%;
  min-height: 350px;
  height: 25vh;
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
  white-space: pre;
`
