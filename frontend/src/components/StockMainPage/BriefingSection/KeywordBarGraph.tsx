import * as Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import styled from "styled-components"
import { useKeywordRank } from "../../../hooks/useKeywordRank"
import { keywordParamsState } from "../../../stores/StockMainAtoms"
import { selectedKeywordState } from "../../../stores/StockMainAtoms"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { useState, useEffect } from "react"

const KeywordBarGraph = () => {
  const keywordParams = useRecoilValue(keywordParamsState)
  const setSelectedKeyword = useSetRecoilState(selectedKeywordState)

  // keyword 순위 읽어오기
  const { data: keywordRankData, isLoading } = useKeywordRank(keywordParams)
  const { top3: chartData, others, totalNewsCount } = { ...keywordRankData }
  chartData !== undefined &&
    setSelectedKeyword({ idx: 1, id: chartData[1].keywordId })

  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({})
  useEffect(() => {
    if (chartData !== undefined) {
      setChartOptions({
        title: { text: undefined },
        chart: {
          type: "column",
          backgroundColor: "var(--custom-background)",
          borderRadius: 20,
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
                setSelectedKeyword(() => {
                  return {
                    idx: event.point.index,
                    id: event.point.keywordId,
                  }
                })
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
  }, [chartData, isLoading])

  return (
    <GraphWrapper>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </GraphWrapper>
  )
}

export default KeywordBarGraph

const GraphWrapper = styled.div`
  width: 100%;
  height: 50vh;
  & div {
    height: 100%;
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
