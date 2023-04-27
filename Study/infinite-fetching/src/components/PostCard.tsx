interface PostCardProps {
  postId: number
  title: string
  body: string
}

const PostCard = ({ postId, title, body }: PostCardProps) => {
  const cardStyle = {
    border: "1px solid #eee",
    borderRadius: "5px",
    padding: "12px",
    margin: "12px",
  }

  return (
    <div style={cardStyle}>
      <h3>{postId}</h3>
      <h5>{title}</h5>
      <p>{body}</p>
    </div>
  )
}

export default PostCard
