import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  stockAccordionOpenState,
  keywordAccordionOpenState,
} from "../../stores/LaboratoryAtoms";

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { colorPalette } from "./PredictSlider";
import styled from "styled-components";

type LabGraphType = {
  keyword: string;
  line: number[][];
  scatter: number[][];
};

interface Props {
  item: LabGraphType;
  index: number;
  coefficient: number;
}

const GraphComp = ({ item, index, coefficient }: Props) => {
  const stockAccordionOpen = useRecoilValue(stockAccordionOpenState);
  const keywordAccordionOpen = useRecoilValue(keywordAccordionOpenState);

  const [chartWidth, setChartWidth] = useState(754);

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
  }, [stockAccordionOpen, keywordAccordionOpen]);

  // chart option
  const chartOptions: Highcharts.Options = {
    title: { text: "" },
    chart: {
      width: chartWidth,
      height: chartWidth,
      backgroundColor: "white",
    },
    colors: [colorPalette[index].color],
    xAxis: {
      title: { text: "빈도" },
      gridLineWidth: 1,
      gridLineDashStyle: "LongDash",
    },
    yAxis: {
      title: { text: "종목" },
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
  width: 30%;

  background-color: white;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1%;
`;

const GraphTitle = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0.4rem 0 1.6rem 0;
  display: flex;
  gap: 2rem;
`;

const CoefficientWrapper = styled.span<{ coefficient: number }>`
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
