import * as Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import styled from "styled-components"
import { useKeywordRank } from "../../../../hooks/useKeywordRank"
import {
  selectedKeywordState,
  keywordAnalysisParamsState,
  panelTypeState,
} from "../../../../stores/StockDetailAtoms"
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil"
import { useState, useEffect } from "react"

const KeywordBarGraphInDetail = () => {
  const keywordParams = useRecoilValue(keywordAnalysisParamsState)
  const [selectedKeyword, setSelectedKeyword] =
    useRecoilState(selectedKeywordState)
  const setPanelType = useSetRecoilState(panelTypeState)
  const showKeywordPanel = (keywordId: number, keyword: string) => {
    setSelectedKeyword({ id: keywordId, name: keyword })
    setPanelType("keyword")
  }

  // keyword 순위 읽어오기
  const { data: keywordRankData, isLoading } = useKeywordRank(keywordParams)
  const { top3: chartData, others, totalNewsCount } = { ...keywordRankData }

  const [chartWidth, setChartWidth] = useState<number>(754)
  const handleResize = () => {
    const chartWrapper = document.getElementById("keyword-bar-graph")
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
  useEffect(() => {
    if (chartData !== undefined) {
      setChartOptions({
        title: { text: undefined },
        chart: {
          type: "column",
          backgroundColor: "var(--custom-background)",
          borderRadius: 20,
          height: 300,
          width: chartWidth,
        },
        colors: [
          "var(--custom-orange-1)",
          "var(--custom-pink-1)",
          "var(--custom-purple-2)",
        ],
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          type: "category",
          crosshair: true,
          labels: {
            enabled: false,
          },
        },
        yAxis: {
          title: {
            text: null,
          },
          gridLineWidth: 0,
          tickWidth: 0,
          labels: {
            enabled: false,
          },
          max: 20,
          // max: isLoading ? 200 : yAxisMax,
          // max: yAxisMax,
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            dataLabels: {
              enabled: true,
              align: "center",
              useHTML: true,
              className: "custom-label",
              formatter: function (this: any) {
                return (
                  '<div><p class="label-title">' +
                  this.point.name +
                  '</p><p class="label-value">' +
                  this.y.toFixed(1) +
                  '%</p><p class="label-rank">' +
                  this.point.rank +
                  "</p></div>"
                )
              },
            },
            events: {
              click: function (event: any) {
                console.log(event.point, event.point.name)
                showKeywordPanel(event.point.keywordId, event.point.name)
              },
            },
            borderRadius: 10,
          },
          series: {
            borderWidth: 0,
          },
        },
        tooltip: {
          enabled: false,
        },
        series: [
          {
            name: "Keyword",
            type: "column",
            data: chartData,
            colorByPoint: true,
            cursor: "pointer",
          },
        ],
      })
    }
  }, [
    chartData,
    isLoading,
    others,
    totalNewsCount,
    keywordParams,
    keywordRankData,
    setChartOptions,
    setSelectedKeyword,
  ])

  return (
    <GraphWrapper id="keyword-bar-graph">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </GraphWrapper>
  )
}

export default KeywordBarGraphInDetail

export const GraphWrapper = styled.div`
  width: 100%;
  height: 60%;
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
