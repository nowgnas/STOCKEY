import { StockCardType } from '../../stores/LaboratoryAtoms';
import styled from 'styled-components';

interface Props {
  item: StockCardType
}

// 추후 로고 이미지 경로 수정 예정
const StockCardMini = ({item}: Props) => {
  return (
    <CardWrapper>
      <LogoImg src={`logo_images/${item.name}.png`} />
      {item.name}
    </CardWrapper>
  )
}

export default StockCardMini;

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  
  font-size: 1.2rem;
  // font-weight: bold;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);

  background: #ffffff;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 24px;
`;

const LogoImg = styled.img`
  width: 30%;
  height: 30%;
`