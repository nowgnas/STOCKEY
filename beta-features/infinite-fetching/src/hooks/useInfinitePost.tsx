import axios from "axios"
import { useInfiniteQuery } from "react-query"

const APP_ID = "644b4bd99bfd206cc3489f5c"
const fetchPostByPage = async ({ pageParam = 1 }) => {
  const res = await axios.get(`https://dummyapi.io/data/v1/post`, {
    headers: {
      "app-id": APP_ID,
    },
    params: {
      page: pageParam,
      limit: 5,
    },
  })
  console.log(`fetching page ${pageParam}`)
  return res.data.data
}
export const useInfinitePost = () => {
  return useInfiniteQuery(["posts"], fetchPostByPage, {
    getNextPageParam: (lastPage, allPages) => {
      // 3페이지까지만 가져오기
      return allPages.length < 3 && allPages.length + 1
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return allPages.length > 1 && allPages.length - 1
    },
  })
}
