import Grid from "@mui/material/Grid"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useIndustryList } from "../hooks/useIndustryList"
import Spinner from "../components/common/Spinner/Spinner"
import {
  DefaultLayout,
  OnIndustrySelectorLayout,
  OnKeywordPanelLayout,
} from "../components/IndustryDetailPage/PageLayouts"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  keywordAnalysisParamsState,
  panelTypeState,
  selectedKeywordState,
  stockDetailState,
} from "../stores/StockDetailAtoms"
import dayjs from "dayjs"
import { useStockDetail } from "../hooks/useStockDetail"
import { useIndustryStockList } from "../hooks/useIndustryStockList"

const IndustryDetailPage = () => {
  const params = useParams()
  const industryName = params?.industryName

  const industryId = industryName ? industryList.indexOf(industryName) + 1 : 0

  const { isLoading, data: industryInfo, error } = useIndustryList(industryId)

  const [mode, setMode] = useState<string>("def")
  const [className, setClassName] = useState<string>("")
  const [panelType, setPanelType] = useRecoilState(panelTypeState)

  const navigate = useNavigate()
  useEffect(() => {
    if (error) {
      navigate("/not-found")
    }
  }, [error, navigate])

  const changeLayout = (toggleMode: string) => {
    switch (toggleMode) {
      case "sel":
        switch (mode) {
          case "sel":
            setClassName("sel-to-def")
            setTimeout(() => {
              setMode("def")
            }, 600)
            break
          case "def":
            setClassName("def-to-sel")
            setTimeout(() => {
              setMode("sel")
            }, 600)
            break
          case "kwd":
            setClassName("kwd-to-sel")
            setTimeout(() => {
              setMode("sel")
            }, 600)
            break
          default:
            break
        }
        break
      case "kwd":
        switch (mode) {
          // case "kwd":
          //   setClassName("kwd-to-def")
          //   setTimeout(() => {
          //     setMode("def")
          //   }, 400)
          //   break
          case "def":
            setClassName("def-to-kwd")
            setTimeout(() => {
              setMode("kwd")
            }, 400)
            break
          case "sel":
            setClassName("sel-to-kwd")
            setTimeout(() => {
              setMode("kwd")
            }, 800)
            break
          default:
            break
        }
        break
      case "def":
        switch (mode) {
          case "kwd":
            setClassName("kwd-to-def")
            setTimeout(() => {
              setMode("def")
            }, 400)
            break
          default:
            setMode("def")
            break
        }
        break
      default:
        break
    }
  }
  const { name: keyword } = useRecoilValue(selectedKeywordState)
  // useEffect(() => {
  //   if (!!keyword) {
  //     changeLayout("kwd")
  //     // setPanelType()
  //   } else {
  //     changeLayout("def")
  //   }
  // }, [keyword])

  const setSelectedKeyword = useSetRecoilState(selectedKeywordState)

  useEffect(() => {
    if (panelType === "keyword") {
      changeLayout("kwd")
    } else {
      changeLayout("def")
    }
  }, [panelType])

  const [keywordAnalysisParams, setKeywordAnalysisParams] = useRecoilState(
    keywordAnalysisParamsState
  )
  useEffect(() => {
    setKeywordAnalysisParams({
      ...keywordAnalysisParams,
      typeId: -1,
      newsType: "INDUSTRY",
      startDate: dayjs("2022-01-01").format("YYMMDD"),
      endDate: dayjs("2022-12-31").format("YYMMDD"),
    })
  }, [])
  const { data: includedStock } = useIndustryStockList(industryId)
  const { data: stockDetail } = useStockDetail(
    !!includedStock?.length ? includedStock[0].id : 1
  )
  const setStockDetail = useSetRecoilState(stockDetailState)
  setStockDetail(stockDetail)

  // 최초 마운트 시 초기화
  useEffect(() => {
    setPanelType("subInfo")
    setMode("def")
    setSelectedKeyword({
      id: 0,
      name: "",
    })
    return () => {
      setPanelType("subInfo")
      setMode("def")
      setSelectedKeyword({
        id: 0,
        name: "",
      })
    }
  }, [])

  return (
    <Grid container rowSpacing={2} columnSpacing={4.5} minWidth="1200px">
      {isLoading ? (
        <Spinner />
      ) : (
        {
          def: (
            <DefaultLayout
              changeLayout={changeLayout}
              className={className}
              industryInfo={industryInfo}
            />
          ),
          kwd: (
            <OnKeywordPanelLayout
              changeLayout={changeLayout}
              className={className}
              industryInfo={industryInfo}
            />
          ),
          sel: (
            <OnIndustrySelectorLayout
              changeLayout={changeLayout}
              className={className}
              industryInfo={industryInfo}
            />
          ),
        }[mode]
      )}
    </Grid>
  )
}

export default IndustryDetailPage

const industryList = [
  "에너지",
  "소재",
  "자본재",
  "운송",
  "자동차와부품",
  "내구소비재와의류",
  "호텔,레스토랑,레저등",
  "소매(유통)",
  "식품,음료,담배",
  "제약과생명공학",
  "은행",
  "증권",
  "다각화된금융",
  "보험",
  "소프트웨어와서비스",
  "기술하드웨어와장비",
  "반도체와반도체장비",
  "전기와전기제품",
  "디스플레이",
  "전기통신서비스",
  "미디어와엔터테인먼트",
  "유틸리티",
]
