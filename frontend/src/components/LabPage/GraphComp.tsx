import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { resultBoardSizeState } from "../../stores/LaboratoryAtoms";
import { LabGraphType } from "./LabType";

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { colorPalette } from "./PredictSlider";
import styled from "styled-components";


interface Props {
  index: number;
  item: LabGraphType;
  coefficient: number;
}

const GraphComp = ({ index, item, coefficient }: Props) => {
  const resultBoardSize = useRecoilValue(resultBoardSizeState);

  const [chartWidth, setChartWidth] = useState(0);

  const handleResize = () => {
    const chartWrapperDiv = document.getElementById("lab-chart-wrapper");
    if (chartWrapperDiv) {
      setChartWidth(chartWrapperDiv.clientWidth);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // accordion 상태에 따라 graph width 변경
  useEffect(() => {
    setTimeout(() => {
      const chartWrapperDiv = document.getElementById("lab-chart-wrapper");
      if (chartWrapperDiv) {
        setChartWidth(chartWrapperDiv.clientWidth);
      }
    }, 1000);
  }, [resultBoardSize]);

  // chart option
  const chartOptions: Highcharts.Options = {
    title: { text: "" },
    chart: {
      width: chartWidth,
      height: chartWidth,
      backgroundColor: "white",
    },
    colors: [colorPalette[index].color],
    accessibility: {
      enabled: false,
    },
    xAxis: {
      title: chartWidth > 240 ? { text: "빈도" } : undefined,
      gridLineWidth: 1,
      gridLineDashStyle: "LongDash",
    },
    yAxis: {
      title: chartWidth > 240 ? { text: "주가" } : undefined,
      gridLineWidth: 1,
      gridLineDashStyle: "LongDash",
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "line",
        name: "",
        data: item.line,
        marker: {
          enabled: false,
        },
        color: colorPalette[index].tooltipColor,
        lineWidth: chartWidth / 80,
        zIndex: 1,
        stickyTracking: false,
        animation: false
      },
      {
        type: "scatter",
        name: "",
        data: item.scatter,
        marker: {
          symbol: "circle",
          lineColor: colorPalette[index].color,
          radius: chartWidth / 100,
          lineWidth: chartWidth / 200,
          fillColor: colorPalette[index].backgroundColor,
        },
      },
    ],
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      series: {
        states: {
          hover: {
            enabled: false,
          },
          inactive: {
            enabled: false,
          },
        },
      },
    },
  };


  return (
    <GraphContainer>
      <GraphTitle>
        {item.keyword}
        <CoefficientWrapper coefficient={coefficient}>
          {coefficient > 0 ? `+${coefficient}` : coefficient}
        </CoefficientWrapper>
      </GraphTitle>
      <ChartWrapperDiv id="lab-chart-wrapper">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </ChartWrapperDiv>
    </GraphContainer>
  );
};

export default GraphComp;

const GraphContainer = styled.div`
  width: 32%;

  background-color: white;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1%;
  overflow: hidden;
`;

const GraphTitle = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0.4rem 0 1.6rem 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const CoefficientWrapper = styled.span<{ coefficient: number }>`
  margin: 0 2rem;
  display: ${props => props.coefficient === 0 ? "none": undefined};
  color: ${(props) =>
    props.coefficient > 0
      ? "var(--custom-increase-red)"
      : props.coefficient === 0
      ? "black"
      : "var(--custom-decrease-blue)"};
`;

const ChartWrapperDiv = styled.div`
  width: 100%;
  height: 100%;
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
    `;
