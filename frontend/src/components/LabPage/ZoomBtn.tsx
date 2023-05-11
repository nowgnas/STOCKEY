import { useRecoilValue, useSetRecoilState } from 'recoil';
import { resultBoardOpenState, resultBoardSizeState } from '../../stores/LaboratoryAtoms';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import styled from "styled-components";
import { styled as emotionStyled } from "@mui/material/styles";

const ZoomBtn = () => {
  const openState = useRecoilValue(resultBoardOpenState);
  const size = useRecoilValue(resultBoardSizeState);
  const setSizeBig = useSetRecoilState(resultBoardSizeState);

  return (
    <BtnWrapper>
      {openState && size === "small" && (
        <IconWrapper onClick={() => setSizeBig("big")}/>
      )}
    </BtnWrapper>
  )
};

export default ZoomBtn;

const BtnWrapper = styled.div`
  width: 50px;
  height: 50px;

  position: absolute;
  top: 20px;
  right: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const IconWrapper = emotionStyled(ZoomOutMapIcon)(() => ({
  fontSize: "3.5rem",
  color: "var(--custom-gray-2)",
  cursor: "pointer"
}))