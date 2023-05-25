import styled from "styled-components"
import IndustryCardList from "./IndustryCardList"
import { useIndustryList } from "../../../hooks/useIndustryList"
import Spinner from "../../common/Spinner/Spinner"

const IndustrySelector = () => {
  const { isLoading, data: industryList } = useIndustryList()

  return (
    <IndustrySelectorDiv>
      <TitleWrapper>
        <IndustrySelectorTitleDiv>산업 분류</IndustrySelectorTitleDiv>
        <DescriptionDiv>산업의 자세한 정보를 알아보세요</DescriptionDiv>
      </TitleWrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <IndustryCardList industryList={industryList} />
      )}
    </IndustrySelectorDiv>
  )
}

export default IndustrySelector

const IndustrySelectorDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 0px;
  gap: 24px;

  background: #f8f8f8;
  /* M3/Elevation Light/3 */

  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 24px;
`

const TitleWrapper = styled.div`
  width: 100%;
  height: auto;
  margin: 0px;
  display: flex;
  padding-left: 24px;
`

const IndustrySelectorTitleDiv = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2rem;
  /* or 83% */

  letter-spacing: 0.1px;

  color: #000000;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`

const DescriptionDiv = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: end;
  font-size: 1.2rem;
  line-height: 1.2rem;
  color: #6d6666;
`
