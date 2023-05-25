import FavoriteIndustryCard from "./FavoriteIndustryCard/FavoriteIndustryCard"
import styled from "@emotion/styled"
import { MyIndustryType } from "./FavoriteIndustryInfoArea"

interface Props {
  myIndustryList: MyIndustryType[]
}

const FavoriteIndustryCardList = ({ myIndustryList }: Props) => {
  return (
    <CardListDiv>
      {myIndustryList.map((myIndustry) => {
        return (
          <FavoriteIndustryCard
            key={myIndustry.id}
            industryName={myIndustry.name}
            industryId={myIndustry.id}
          />
        )
      })}
    </CardListDiv>
  )
}

export default FavoriteIndustryCardList

const CardListDiv = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  gap: 24px;
  width: auto;
  padding: 0px 24px 4px;
  overflow-y: scroll;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`
