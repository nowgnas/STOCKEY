import styled from "styled-components"
import Grid from "@mui/material/Grid"
import MyRankingItem from "./MyRankingItem"
import RankingItem from "./RankingItem"
import { PanelTitle } from "../StockDetailPage/SubPanel/KeywordPanel/KeywordPanel"
import { triggerScroll } from "../common/Functions/triggerScroll"
import { useEffect } from "react"
import { useTraderRank } from "../../hooks/useTraderRank"
import { nicknameState } from "../../stores/atoms"
import { useRecoilValue } from "recoil"

const TraderRankingList = () => {
  const { data: rankData } = useTraderRank("깐풍쿠키")
  const myNickname = useRecoilValue(nicknameState)

  // 랭킹 리스트로 스크롤 이동
  useEffect(() => {
    triggerScroll("ranking-list")
  }, [])

  return (
    <RankingSection container rowSpacing={2} id="ranking-list">
      <PanelTitle style={{ marginBottom: "36px" }}>
        이번 주 누적 랭킹 🔥
      </PanelTitle>

      {rankData?.myRank && rankData?.myRank > -1 && (
        <StickyGrid
          item
          xs={12}
          children={<MyRankingItem name={myNickname} rank={rankData?.myRank} />}
        />
      )}
      <Grid container xs={12} rowSpacing={3}>
        {rankData?.traderRankList.length !== 0 &&
          rankData?.traderRankList.map((trader) =>
            trader.nickName === myNickname ? (
              <MyRankingItem name={myNickname} rank={rankData?.myRank} />
            ) : (
              <RankingItem
                key={`ranking-${trader.nickName}`}
                rank={trader.ranking}
                name={trader.nickName}
                asset={trader.totalAsset}
              />
            )
          )}
      </Grid>
    </RankingSection>
  )
}

export default TraderRankingList

const RankingSection = styled(Grid)`
  padding: 10% 20%;
`

const StickyGrid = styled(Grid)`
  // 상단에 고정
  position: sticky;
  top: 0;

  // 다른 요소랑 겹치면 다른 요소는 안보이게
  z-index: 1;
  background-color: white;

  padding-bottom: 2rem;
`
