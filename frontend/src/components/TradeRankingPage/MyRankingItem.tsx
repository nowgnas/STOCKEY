import { RankWrapper } from "./RankingItem"
import Avatar, { genConfig } from "react-nice-avatar"
import { useMyAsset } from "../../hooks/useMyAsset"
import { Grid } from "@mui/material"

interface MyRankingProps {
  rank: number
  name: string
}

const MyRankingItem = ({ rank, name }: MyRankingProps) => {
  const { data: asset } = useMyAsset()
  const config = genConfig(name)

  return (
    <Grid item xs={12}>
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
          <span>{asset?.totalAssets.toLocaleString()}</span>
        </div>
      </RankWrapper>
    </Grid>
  )
}

export default MyRankingItem
