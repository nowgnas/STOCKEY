import styled from "styled-components"
import Avatar, { genConfig } from "react-nice-avatar"

interface TraderProps {
  name: string
  account: number
  rank: number
}

const TraderCard = ({ name, account, rank }: TraderProps) => {
  const config = genConfig(name)

  return (
    <CardWrapper rank={rank}>
      <Avatar
        shape="circle"
        {...config}
        style={{
          width: "10rem",
          height: "10rem",
          marginRight: "1.2rem",
        }}
      />
      <TraderInfo>
        <TraderName>{name}</TraderName>
        <TraderAccount>₩ {account.toLocaleString()}</TraderAccount>
      </TraderInfo>
    </CardWrapper>
  )
}

export default TraderCard

const CardWrapper = styled.div<{ rank: number }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 180px;
  padding: 36px 30px;

  background-color: white;
  border-radius: 36px;

  & p {
    margin: 0;
    font-weight: bold;
  }
`
const TraderInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 8rem;
`

const TraderName = styled.p`
  font-size: 2.8rem;
`
const TraderAccount = styled.p`
  font-size: 1.8rem;
  font-style: italic;
  padding-left: 0.3rem;
  color: var(--custom-gray-1);
`
