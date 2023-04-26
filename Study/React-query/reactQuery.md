## 쿼리 생성 및 로딩 / 에러 상태

- React Query concept
    - Fetching data
    - Loading / error states
    - dev tools
    - pagination
    - prefetching
    - mutation
- isFetching / isLoading
    
- stale time / cache time

<br>

## Pagination / Prefetching / Mutation

`blog-em project`

- 쿼리 키
    
    query key를 “commemts” 이렇게만 하면, post id가 변해도 fetching 새로 해오지 않음
    
    → query key 배열로 설정
    
    ```jsx
    // PostDetail.jsx
    
    const { data, isError, error, isLoading } = useQuery(
        ["comments", post.id], 
        () => fetchComments(post.id), 
    );
    ```
    
- Pagination
    
    ```jsx
    // Posts.jsx
    
    const [currentPage, setCurrentPage] = useState(1);
    
    const { data, isError, error, isLoading } = useQuery(
        ["posts", currentPage],
        () => fetchPosts(currentPage),
        { staleTime: 2000 }
      );
     
    return (
    	<>
    		...
    			<div className="pages">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous page
            </button>
    
            <span>Page {currentPage}</span>
    
            <button
              disabled={currentPage >= maxPostPage}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next page
            </button>
          </div>
    		...
    	</>
    );
    ```
    
    page에 따라 데이터 새로 불러와야함 → 배열로 key 설정
    
    fetch 해온 데이터 가져올때는 cache 에서 가져옴 (loading x)
    
    새로운 데이터 가져올때는 loading 컴포 뜸 → 사용자 경험 다소 떨어짐 → prefetching
    
- Prefetching
    
    ```jsx
    // Posts.jsx
    
    import { useState, useEffect } from "react";
    import { useQuery, useQueryClient } from "react-query";
    
    ...
    	const queryClient = useQueryClient();
    
      useEffect(() => {
        if (currentPage >= maxPostPage) return;
        const nextPage = currentPage + 1;
        queryClient.prefetchQuery(
          ["posts", nextPage], 
          () => fetchPosts(nextPage),
          { staleTime: 2000 }
        )
      }, [currentPage, queryClient])
    
    	const { data, isError, error, isLoading } = useQuery(
        ["posts", currentPage],
        () => fetchPosts(currentPage),
        { staleTime: 2000,
          keepPreviousData: true}
      );
    ...
    ```
    
    다음 페이지 데이터 prefetching으로 가져오도록 함.
    
    다음 페이지 클릭했을때 currentPage 확실하지 않으므로, useEffect에 걸었음.
    
    - isLoading: 캐시에 있는 데이터 가져오는 경우 포함 x
    - isFetching: 캐시에 있는 데이터 가져오는 경우 포함 o ( 더 큰 개념 )



- Mutation
    
  ```jsx
  // PostDetail.jsx
  
  ...
  // const deleteMutation = useMutation((postId) => deletePost(postId)); 인수 전달 가능
    const deleteMutation = useMutation(() => deletePost(post.id));
  
  return (
    ...
        <button onClick={() => deleteMutation.mutate()}>
          Delete
        </button> 
        {deleteMutation.isLoading && <p style={{color: 'purple'}}>Deleting the post</p>}
        {deleteMutation.isError && <p style={{color: 'red'}}>Error deleting the post</p>}
        {deleteMutation.isSuccess && <p style={{color: 'green'}}>Post has (not) been deleted</p>}
    ...
  )
  ```

<br>

## 동적 데이터 로드 / Infinite-scroll

`infinite-starwars-api project`

- When using **`useInfiniteQuery`**, you'll notice a few things are different:
    - **`data`** is now an object containing infinite query data:
        - **`data.pages`** array containing the fetched pages
        - **`data.pageParams`** array containing the page params used to fetch the pages

    
    - The **`fetchNextPage`** and **`fetchPreviousPage`** functions are now available
    - The **`getNextPageParam`** and **`getPreviousPageParam`** options are available for both determining if there is more data to load and the information to fetch it. This information is supplied as an additional parameter in the query function (which can optionally be overridden when calling the **`fetchNextPage`** or **`fetchPreviousPage`** functions)
    - A **`hasNextPage`** boolean is now available and is **`true`** if **`getNextPageParam`** returns a value other than **`undefined`**
    - A **`hasPreviousPage`** boolean is now available and is **`true`** if **`getPreviousPageParam`** returns a value other than **`undefined`**
    - The **`isFetchingNextPage`** and **`isFetchingPreviousPage`** booleans are now available to distinguish between a background refresh state and a loading more state
    
    > Note: When using options like initialData or select in your query, make sure that when you restructure your data that it still includes data.pages and data.pageParams properties, otherwise your changes will be overwritten by the query in its return!
    > 



pageParam: 가져와야 할 다음 data 나타냄 (getNextPageParam을 통해 관리)

```jsx
// InfiniteSpecies.jsx

import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/"
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery("species", ({ pageParam =  initialUrl }) => fetchUrl(pageParam), {
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((item) => {
            return (
              <Species
                key={item.name}
                name={item.name}
                language={item.language}
                averageLifespan={item.average_lifespan}
              />
            );
          });
        })}
      </InfiniteScroll>
      {isFetchingNextPage && <div>Loading More...</div>}
    </>
  );
}
```