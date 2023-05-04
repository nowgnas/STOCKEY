import styled from "styled-components"

interface WrapperProps {
  pt?: 0 | 1 | 2 | 3 | 4 | string
  pb?: 0 | 1 | 2 | 3 | 4 | string
  pl?: 0 | 1 | 2 | 3 | 4 | string
  pr?: 0 | 1 | 2 | 3 | 4 | string
  bgColor?: string
}
const defaultPadding = 12

export const SectionWrapper = styled.div<WrapperProps>`
  // padding
  // 0px, 12px, 24px, 36px, 48px 또는 직접 입력한 값으로 설정

  padding-top: ${({ pt }) =>
    pt === undefined
      ? "0px"
      : typeof pt === "number"
      ? `${defaultPadding * pt}px`
      : pt};
  padding-bottom: ${({ pb }) =>
    pb === undefined
      ? "0px"
      : typeof pb === "number"
      ? `${defaultPadding * pb}px`
      : pb};
  padding-left: ${({ pl }) =>
    pl === undefined
      ? "0px"
      : typeof pl === "number"
      ? `${defaultPadding * pl}px`
      : pl};
  padding-right: ${({ pr }) =>
    pr === undefined
      ? "0px"
      : typeof pr === "number"
      ? `${defaultPadding * pr}px`
      : pr};
  
  // 높이
  height: 100%;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "transparent")};
  
  // 모서리 radius
  border-radius: 24px;

  // 내부 스크롤(스크롤바 없애기)
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  }
`
