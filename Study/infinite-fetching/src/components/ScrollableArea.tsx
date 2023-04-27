import { useInfinitePost } from "../hooks/useInfinitePost"
import PostCard from "./PostCard"

const ScrollableArea = () => {
  const { data: fetchedPosts } = useInfinitePost(5)

  return (
    <div>
      {fetchedPosts?.pages.map((post, index) => {
        return (
          <PostCard
            key={post.id}
            postId={post.id}
            title={post.title}
            body={post.body}
          />
        )
      })}
    </div>
  )
}

export default ScrollableArea
