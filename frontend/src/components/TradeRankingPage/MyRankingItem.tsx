import { RankWrapper, RankingProps } from "./RankingItem"
import Avatar, { genConfig } from "react-nice-avatar"

const MyRankingItem = ({ rank, name, account }: RankingProps) => {
  const config = genConfig()

  return (
    <RankWrapper
      style={{
        borderColor: "var(--custom-mint)",
        backgroundColor: "#E9FBF5",
        position: "relative",
      }}
      rank={rank}
    >
      <div>
        <span>{rank}</span>

        <Avatar
          shape="circle"
          {...config}
          style={{
            width: "6rem",
            height: "6rem",
            marginRight: "2rem",
          }}
        />

        <span>{name}</span>
      </div>

      <div>
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/parakeet/48/money-bag.png"
          alt="money-bag"
        />
        <span>{account.toLocaleString()}</span>
      </div>
    </RankWrapper>
  )
}

export default MyRankingItem
