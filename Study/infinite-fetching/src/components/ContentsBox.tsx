import ScrollableArea from "./ScrollableArea"
import { useInfinitePost } from "../hooks/useInfinitePost"

const ContentsBox = () => {
  const boxStyle = {
    width: "50%",
    height: "60%",
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "24px 12px",
    margin: "36px auto",
  }

  const { fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage } =
    useInfinitePost(1)

  return (
    <div style={boxStyle}>
      <h2>ContentsBox</h2>
      <button
        onClick={() => {
          hasPreviousPage && fetchPreviousPage()
        }}
      >
        Prev
      </button>
      <button
        onClick={() => {
          hasNextPage && fetchNextPage()
        }}
      >
        Next
      </button>
      <ScrollableArea />
    </div>
  )
}

export default ContentsBox
