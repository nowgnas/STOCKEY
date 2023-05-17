import customAxios from "../utils/customAxios";
import { useQuery } from "react-query";

const axios = customAxios();

type ParamsType = {
  pathVariable: string | undefined;
};

// labPage get 요청
const getLab = async (baseUrl: string, params?: ParamsType | undefined) => {
  let url = baseUrl;
  // path variable 있는 경우 추가
  if (params && params.pathVariable) {
    url += `/${params.pathVariable}`;
  }

  console.log(url, "get!");
  const response = await axios.get(url);
  console.log(response);
  return response;
};

// select
const select = (response: any) => {
  return response.data.data;
};

// stock 전체 list get
export const useStockEntire = () => {
  return useQuery(["lab", "stock", "entire"], () => getLab("/lab/stock/list"), {
    staleTime: Infinity,
    select,
  });
};


