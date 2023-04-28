import { useInfinitePost } from "../hooks/useInfinitePost"
import PostCard from "./PostCard"
import InfiniteScroll from "react-infinite-scroll-component"
import { useQueryClient } from "react-query"

const ScrollableArea = () => {
  const { data: fetchedPosts, fetchNextPage, hasNextPage } = useInfinitePost()
  const queryClient = useQueryClient()
  return (
    <div
      id="scrollableDiv"
      style={{ height: "85%", border: "1px solid green", overflow: "auto" }}
    >
      <InfiniteScroll
        dataLength={fetchedPosts?.pages.length ?? 0}
        next={fetchNextPage}
        hasMore={hasNextPage ?? true}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>End of Posts</h4>}
        scrollableTarget="scrollableDiv"
        // pullDownToRefresh 기능을 위한 설정
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={<h3>Pull down to refresh</h3>}
        releaseToRefreshContent={<h3>Release to refresh</h3>}
        refreshFunction={() => {
          // refresh 시, 가져왔던 페이지를 모두 지우고 첫번째 페이지를 가져오기
          queryClient.setQueryData("posts", () => ({
            pages: [],
            pageParams: [],
          }))
          fetchNextPage({ pageParam: 1 })
        }}
      >
        {fetchedPosts?.pages.map((page, pageIndex) =>
          page.map((post: any, postIndex: number) => {
            return (
              <PostCard
                key={post.id}
                pageNum={pageIndex + 1}
                postNum={5 * pageIndex + (postIndex + 1)}
                title={post.owner.title}
                content={post.text}
                imgSrc={post.image}
              />
            )
          })
        )}
      </InfiniteScroll>
    </div>
  )
}

export default ScrollableArea
