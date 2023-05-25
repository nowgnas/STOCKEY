// lab page useQuery 모음

import customAxios from "../utils/customAxios";
import { useQuery, useInfiniteQuery } from "react-query";
import { StockCardType } from "../components/LabPage/LabType"; 

const axios = customAxios({});

type ParamsType = {
  pathVariable?: string | undefined;
  requestParameter?: any[];
  pageParam?: number | undefined;
};

// labPage get 요청
const getLab = async (baseUrl: string, params?: ParamsType | undefined) => {
  let url = baseUrl
  // path variable 있는 경우 추가
  if (params && params.pathVariable) {
    url += `/${params.pathVariable}`
  }
  // page param 있는 경우 추가
  if (params && params.pageParam) {
    url += `/${params.pageParam}`;
  }
  // request Param 있는 경우 추가
  if (params && params.requestParameter) {
    params.requestParameter.forEach((param, index) => {
      if (index === 0) {
        url += `?${param[0]}=${param[1]}`
      } else {
        url += `&${param[0]}=${param[1]}`
      }
    })
  }
  console.log(url, "get!");
  const response = await axios.get(url);
  console.log(response);
  return response.data.data;
};

// onError
const onError = (err: any) => {
  alert("잠시후 다시 시도해주세요.");
};

// ----------------------- query ---------------------------

// stock 전체 list get
export const useLabStockEntire = () => {
  return useQuery(["lab", "stock", "entire"], () => getLab("/lab/stock/list"), {
    staleTime: Infinity,
    onError,
    refetchOnWindowFocus: false,
  });
};

// stock 검색 get
export const useLabStockSearch = (searchValue: string | undefined) => {
  return useQuery(
    ["lab", "stock", "search", searchValue],
    () =>
      getLab("lab/stock/search", {
        pathVariable: searchValue,
      }),
    {
      staleTime: 1000 * 10,
      cacheTime: 1000 * 20,
      onError,
      refetchOnWindowFocus: false,
      // searchValue 있을때만 실행
      enabled: !!searchValue,
    }
  )
}

// keyword stock 기반 get
// export const useLabKeywordStock = (seletedStock: StockCardType | undefined) => {
//   return useQuery(
//     ["lab", "keyword", "stock", seletedStock],
//   )
// }

// keyword 검색 get
export const useLabKeywordSearch = (searchValue: string | undefined) => {
  return useInfiniteQuery(
    ["lab", "keyword", "search", searchValue],
    ({ pageParam = "" }) =>
      getLab("lab/keyword/search", {
        pathVariable: searchValue,
        pageParam: pageParam,
      }),
    {
      cacheTime: 1000 * 20,
      onError,
      refetchOnWindowFocus: false,
      // searchValue 있을때만 실행
      enabled: !!searchValue,
      // 무한스크롤 pageParam custom
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );
};


// result data get
export const useLabResult = (
  selectedStock: StockCardType | undefined,
  selectedKeywordList: any[],
  // selectedPeriod: number,
  isClicked: boolean
) => {
  const requestParameter: any[] = []
  if (selectedStock) {
    requestParameter.push(['stockid', selectedStock!.id])
  }
  if (selectedKeywordList) {
    selectedKeywordList.forEach((item, index) => {
      requestParameter.push([`id${index+1}`, item.id])
    })
  }
  return useQuery(
    ["lab", "result"],
    () => getLab("lab/data/graph", {
      requestParameter: requestParameter
    }),
    { 
      staleTime: 1000 * 60 * 60,
      onError,
      refetchOnWindowFocus: false,
      // click했을때만 실행
      enabled: !!isClicked
    }
  )
}
