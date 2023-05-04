import { useState } from "react";
import { SetterOrUpdater } from "recoil";

import Slider from "@mui/material/Slider";
import styled from "styled-components";
import { styled as emotionStyled } from "@mui/material/styles";

interface Props {
  item: {
    keyword: string;
    cnt: number;
  };
  index: number;
  setSliderList: SetterOrUpdater<any[]>;
}

const PredictSlider = ({ item, index, setSliderList }: Props) => {
  const [tooltipVisible, setTooltipVisible] = useState<"auto" | "on">("auto");

  const changeHandler = (e: any) => {
    setSliderList((prev) => {
      return prev.map((prevItem) => {
        return prevItem.keyword === item.keyword
          ? { keyword: prevItem.keyword, cnt: e.target.value }
          : prevItem;
      });
    });
  };

  const btnHandler = (type: string) => {
    if (type === "plus") {
      setSliderList((prev) => {
        return prev.map((prevItem) => {
          return prevItem.keyword === item.keyword
            ? { keyword: prevItem.keyword, cnt: prevItem.cnt + 1 }
            : prevItem;
        });
      });
    } else {
      setSliderList((prev) => {
        return prev.map((prevItem) => {
          return prevItem.keyword === item.keyword
            ? { keyword: prevItem.keyword, cnt: prevItem.cnt - 1 }
            : prevItem;
        });
      });
    }
  };

  return (
    <SliderSection>
      <KeywordWrapper>{item.keyword}</KeywordWrapper>
      <SlideBarSection>
        <BtnWrapper
          onClick={() => btnHandler("minus")}
          onMouseEnter={() => setTooltipVisible("on")}
          onMouseLeave={() => setTooltipVisible("auto")}
        >
          -
        </BtnWrapper>

        <PrettoSlider
          colorPalette={colorPalette[index]}
          valueLabelDisplay={tooltipVisible}
          value={item.cnt}
          onChange={changeHandler}
        />

        <BtnWrapper
          onClick={() => btnHandler("plus")}
          onMouseEnter={() => setTooltipVisible("on")}
          onMouseLeave={() => setTooltipVisible("auto")}
        >
          +
        </BtnWrapper>
      </SlideBarSection>
    </SliderSection>
  );
};

export default PredictSlider;

const SliderSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const KeywordWrapper = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SlideBarSection = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BtnWrapper = styled.div`
  width: 24px;
  height: 24px;
  padding-bottom: 6px;
  border-radius: 50%;
  background: white;
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--custom-gray-1);

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 1px 3px 1px rgba(0, 0, 0, 0.15);

  cursor: pointer;
`;

const colorPalette = [
  {
    color: "var(--custom-pink-2)",
    backgroundColor: "var(--custom-pink-4)",
    tooltipColor: "var(--custom-pink-1)",
  },
  {
    color: "var(--custom-orange-2)",
    backgroundColor: "var(--custom-orange-4)",
    tooltipColor: "var(--custom-orange-1)",
  },
  {
    color: "var(--custom-purple-2)",
    backgroundColor: "var(--custom-purple-4)",
    tooltipColor: "var(--custom-purple-1)",
  },
];

type sliderProps = {
  colorPalette: {
    color: string;
    backgroundColor: string;
    tooltipColor: string;
  };
};

const PrettoSlider = emotionStyled(Slider)<sliderProps>(({ colorPalette }) => ({
  color: colorPalette.color,
  height: 8,
  width: "80%",
  cursor: "default",
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "white",
    border: "2px solid currentColor",
    cursor: "pointer",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: "1.4rem",
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: colorPalette.tooltipColor,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
}));
