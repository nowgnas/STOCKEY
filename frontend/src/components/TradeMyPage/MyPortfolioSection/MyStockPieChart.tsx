import { PanelTitle } from "../../StockDetailPage/SubPanel/KeywordPanel/KeywordPanel"
import ChartWrapper from "../../common/Chart/ChartWrapper"

const MyStockPieChart = () => {
  const chartOptions: Highcharts.Options = {
    chart: {
      backgroundColor: "white",
    },
    colors: [
      "rgba(151, 227, 213, 1)",
      "rgba(241, 225, 91, 1)",
      "rgba(232, 193, 160, 1)",
      "rgba(244, 117, 96, 1)",
      "rgba(232, 168, 56, 1)",
    ],
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    legend: {
      enabled: false,
      // backgroundColor: "white",
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        return `<circle/><p><b>${
          this.point.name
        }</b></p><hr/><p><b>총 ${this.point.y?.toLocaleString()}원</b></p><p>전체 자산의 <b>${this.point.percentage?.toFixed(
          1
        )}%</b></p>`
      },
    },
    plotOptions: {
      series: {
        borderWidth: 5,
      },
      pie: {
        allowPointSelect: true,
        shadow: false,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          distance: -30,
          style: {
            textOutline: "none",
          },
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Percentage",
        type: "pie",
        innerSize: "30%",
        keys: ["name", "y"],
        data: [
          ["네이버", 150000],
          ["신한지주", 110000],
          ["카카오", 78000],
          ["삼성전자", 59000],
          ["포스코건설", 45000],
        ],
      },
    ],
  }
  return (
    <>
      <PanelTitle>보유 종목</PanelTitle>
      <ChartWrapper chartOptions={chartOptions} height="40%" />
    </>
  )
}

export default MyStockPieChart
