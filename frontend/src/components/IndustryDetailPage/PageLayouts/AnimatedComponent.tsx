import styled, { keyframes } from "styled-components"

const ButtonDiv = styled.div`
  padding: 24px 0px 0px 0px;
`

const TitleDiv = styled.div`
  font-size: 2.6rem;
  font-weight: bold;
  letter-spacing: 0.2rem;
`

const LeftSection = styled.div`
  padding: 0px 10px 36px 26px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: calc(100vh - 96px);

  &.kwd {
    overflow-y: scroll;
    height: 100vh;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`

const RightSection = styled.div`
  padding: 0px 36px 36px 0px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const SlideToRight = keyframes`
  from {
    z-index: 1;
    transform: translateX(-71.4%);
  }
  to {
    transform: translateX(0%);
  }
`

const SlideToLeftForKwd = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
`

const SlideOverLeft = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-71.4%);
  }
`

const SlideToLeft = keyframes`
  from {
    transform: translateX(71.4%);
  }
  to {
    transform: translateX(0%);
  }
`

const SlideToRightAndDisppear = keyframes`
  from {
    opacity: 1;
    transform: translateX(0%);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`

const SlideDownAndAppear = keyframes`
from {
  opacity: 0;
  height: 0;
  visibility: hidden;
}
to {
  opacity: 1;
  visibility: visible;
}
`

const SlideUpAndDisappear = keyframes`
from {
  opacity: 1;
  visibility: visible;
}
to {
  opacity: 0;
  visibility: hidden;
  height: 0;
}
`

const SlideDown = keyframes`
  from {
    transform: translateY(0%);
  }
  to {
    opacity: 0;
    transform: translateY(${
      document.getElementById("left")?.clientHeight || 811
    }px);
  }
`

const SlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(${
      document.getElementById("left")?.clientHeight || 811
    }px);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`

const FadeOut = keyframes`
  from {
  opacity: 1;
  }
  to {
  opacity: 0;
  }
`

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const SelectorSlider = styled.div`
  transition: all 0.6s forwards;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  height: calc(100vh - 132px);
  opacity: 0;
  visibility: hidden;

  &.def-to-sel {
    z-index: 1;
    animation-delay: 0.6s;
    animation-name: ${SlideDownAndAppear};
  }
  &.sel-to-def {
    animation-name: ${SlideUpAndDisappear};
  }
  &.sel.kwd-to-sel {
    z-index: 1;
    animation-delay: 0.6s;
    animation-name: ${SlideDownAndAppear};
  }
  &.sel-to-kwd {
    animation-duration: 0.4s;
    animation-name: ${SlideUpAndDisappear};
  }
`

const LeftSlider = styled.div`
  transition: all 0.6s forwards;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  z-index: 1;
  &.sel.def-to-sel {
    animation-name: ${SlideToRight};
  }
  &.def.sel-to-def {
    animation-name: ${SlideToLeft};
  }
  &.sel.kwd-to-sel {
    animation-name: ${SlideToRight};
  }
  &.sel.sel-to-kwd {
    animation-delay: 0.4s;
    animation-duration: 0.4s;
    animation-name: ${SlideOverLeft};
  }
`

const RightSlider = styled.div`
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  &.def.def-to-sel {
    animation-name: ${SlideDown};
  }
  &.sel.def-to-sel {
    transform-origin: top right;
    animation-name: ${FadeIn};
  }
  &.sel.sel-to-def {
    animation-name: ${FadeOut};
  }
  &.def.sel-to-def {
    opacity: 0;
    animation-delay: 0.4s;
    animation-name: ${SlideUp};
  }
  &.def.def-to-kwd {
    animation-duration: 0.4s;
    animation-name: ${FadeOut};
  }
  &.kwd.def-to-kwd {
    animation-name: ${FadeIn};
  }
  &.kwd.kwd-to-def {
    animation-duration: 0.4s;
    animation-name: ${FadeOut};
  }
  &.def.kwd-to-def {
    animation-name: ${FadeIn};
  }
  &.sel.kwd-to-sel {
    animation-name: ${SlideToRight};
  }
  &.sel.sel-to-kwd {
    animation-delay: 0.4s;
    animation-duration: 0.4s;
    animation-name: ${SlideOverLeft};
  }
`

const PanelSlider = styled.div`
  transition: all 0.6s forwards;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  &.kwd {
    height: 100vh;
    overflow-y: scroll;
    overflow-x: visible;
  }
  &.kwd::-webkit-scrollbar {
    display: none;
  }
  &.def-to-kwd {
    animation-name: ${SlideToLeftForKwd};
  }
  &.kwd-to-def {
    animation-name: ${SlideToRightAndDisppear};
  }
  &.kwd-to-sel {
    animation-name: ${SlideToRightAndDisppear};
  }
  &.sel-to-kwd {
    animation-name: ${SlideToLeftForKwd};
  }
`

export {
  ButtonDiv,
  TitleDiv,
  LeftSection,
  RightSection,
  SelectorSlider,
  LeftSlider,
  RightSlider,
  PanelSlider,
}
