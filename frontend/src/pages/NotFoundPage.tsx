import styled, { keyframes } from "styled-components"

const NotFoundPage = () => {
  return (
    <PageWrapper>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>
        {`찾을 수 없는 페이지입니다.
        요청하신 페이지가 사라졌거나, 주소가 잘못 입력되었습니다.
        입력하신 페이지 주소가 정확한지 다시 한번 확인해주세요.`}
      </ErrorMessage>
    </PageWrapper>
  )
}

export default NotFoundPage

const PageWrapper = styled.div`
  padding: 36px;
  height: 100%;
  display: flex;
  gap: 3rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // 드래그 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const ErrorCode = styled.div`
  font-size: 6rem;
  text-align: center;
`

const ErrorMessage = styled.div`
  white-space: pre-line;
  text-align: center;
  font-size: 1.6rem;
  color: gray;
  line-height: 3rem;
`

// 호버링 애니메이션
const BtnHoverAnime = keyframes`
  from {
    background: none;
  }
  to {
    background: linear-gradient(92.18deg, #ff996c 1.48%, #fe7598 98.93%);
    // background-color: white;
  }
`

// 버튼 styled
const PageLinkBtnDiv = styled.div`
  // 레이아웃
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  gap: 10px;

  // 크기
  width: 100%;

  // 형태
  border-radius: 100px;

  // 글자
  font-weight: bold;
  font-size: 2rem;
  color: white;

  // 마진
  margin-top: 24px;

  // transition
  transition: all 0.25s ease;

  // 드래그 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  // 커서
  cursor: pointer;

  &.selected {
    background: linear-gradient(92.18deg, #ff996c 1.48%, #fe7598 98.93%);
  }
  &:hover {
    animation: ${BtnHoverAnime} 0s 0s ease 1 forwards;
    transform: scale(1.1, 1.1);
  }
`

// 버튼 내 text style
const PageLinkText = styled.div`
  color: inherit;
  text-align: center;
  width: calc(100% - 40px);
`
