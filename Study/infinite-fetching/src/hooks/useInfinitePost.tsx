import axios from "axios"
import { useInfiniteQuery } from "react-query"

const fetchPostByPage = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${pageParam}`
  )
  return res.data
}

export const useInfinitePost = (pageSize: number) => {
  return useInfiniteQuery(["posts"], fetchPostByPage, {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.id < 100 && lastPage.id + pageSize
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.id > 1 && firstPage.id - pageSize
    },
  })
}
