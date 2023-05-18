// lab page useQuery 모음

import customAxios from "../utils/customAxios";
import { useQuery, useInfiniteQuery } from "react-query";
import { StockCardType } from "../stores/LaboratoryAtoms";

const axios = customAxios();

type ParamsType = {
  pathVariable?: string | undefined;
  pageParam?: number | undefined;
};

// labPage get 요청
const getLab = async (baseUrl: string, params?: ParamsType | undefined) => {
  let url = baseUrl;
  // path variable 있는 경우 추가
  if (params && params.pathVariable) {
    url += `/${params.pathVariable}`;
  }
  // page param 있는 경우 추가
  if (params && params.pageParam) {
    url += `/${params.pageParam}`;
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
  );
};

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

// graph data get
export const useLabResultGraph = (
  selectedStock: StockCardType | undefined = undefined,
  selectedKeywordList: any[] | undefined = undefined,
  isClicked: boolean | undefined = undefined
) => {
  return useQuery(
    ["lab", "result", "graph"],
    () =>
      getLab("lab/result/graph-test", {
        pathVariable: selectedStock?.name,
      }),
    {
      refetchOnWindowFocus: false,
      // click했을때만 실행
      enabled: !!isClicked,
    }
  );
};

// 회귀분석 data get
export const useLabResultRegression = (
  selectedStock: StockCardType | undefined = undefined,
  selectedKeywordList: any[] | undefined = undefined,
  isClicked: boolean | undefined = undefined
) => {
  return useQuery(
    ["lab", "result", "regression"],
    () =>
      getLab("lab/result/regression-test", {
        pathVariable: selectedStock?.name,
      }),
    {
      refetchOnWindowFocus: false,
      // click했을때만 실행
      enabled: !!isClicked,
    }
  );
};
