// lab page useQuery 모음

import customAxios from "../utils/customAxios";
import { useQuery, useInfiniteQuery } from "react-query";

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
  console.warn("onError >> ", err);
};

// stock 전체 list get
export const useLabStockEntire = () => {
  return useQuery(["lab", "stock", "entire"], () => getLab("/lab/stock/list"), {
    staleTime: Infinity,
    onError,
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
      // searchValue 있을때만 실행
      enabled: !!searchValue,
    }
  );
};

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
      staleTime: 1000 * 10,
      cacheTime: 1000 * 20,
      onError,
      // select: (data) => ({
      //   // 무한스크롤 위해 pages를 일차원 배열로 flat
      //   pages: data.pages.flatMap((ele) => ele),
      //   pageParams: data.pageParams,
      // }),

      // searchValue 있을때만 실행
      enabled: !!searchValue,

      // 무한스크롤 pageParam custom
      getNextPageParam: (lastPage) => lastPage.next || undefined
    }
  );
};
