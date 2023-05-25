import styled from "styled-components"

const MainSection = styled.div<{ bgColor?: string }>`
  // position
  position: relative;

  // 색상
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "white")};
  color: #000000;

  // 모서리 radius
  border-radius: 24px 0px 0px 0px;

  // 세로 크기
  height: 100vh;

  // transition
  transition: 0.3s all ease;

  // 내부 스크롤(스크롤바 없애기)
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`

export default MainSection
