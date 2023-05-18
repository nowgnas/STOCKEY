import styled, { keyframes } from "styled-components"

// mui icon
import LogoutIcon from "@mui/icons-material/Logout"
import { useNavigate } from "react-router-dom"
import customAxios from "../../../utils/customAxios"

type LogoutBtnProps = {
  isNarrow: boolean
}

const LogoutBtn = ({ isNarrow }: LogoutBtnProps) => {
  // useNavigate
  const navigate = useNavigate()
  // customAxios
  const axios = customAxios({ isAuthNeeded: true })

  const handleClick = () => {
    if (sessionStorage.getItem("accessToken")) {
      axios
        .post("auth/logout")
        .then((response) => {
          sessionStorage.setItem("accessToken", "")
          // setNickname("")
          window.alert("로그아웃 되었습니다")
          navigate("/user/login")
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <>
      <PageLinkBtnDiv onClick={handleClick}>
        <LogoutIcon />
        {isNarrow ? undefined : <PageLinkText>로그아웃</PageLinkText>}
      </PageLinkBtnDiv>
    </>
  )
}

export default LogoutBtn

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

  // 형태
  width: 100%;
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
