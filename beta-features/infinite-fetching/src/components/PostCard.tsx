export interface PostCardProps {
  pageNum: number
  postNum: number
  title: string
  content: string
  imgSrc: string
}

const PostCard = ({ pageNum, postNum, content, imgSrc }: PostCardProps) => {
  const cardStyle = {
    border: "1px solid #eee",
    borderRadius: "5px",
    padding: "12px",
    margin: "12px",
  }

  return (
    <div style={cardStyle}>
      <h3>{postNum}</h3>
      <img src={imgSrc} alt="post" style={{ width: "100px" }} />
      <p>{content}</p>
      <p style={{ textAlign: "end", color: "gray", fontSize: "10px" }}>
        page {pageNum}
      </p>
    </div>
  )
}

export default PostCard
