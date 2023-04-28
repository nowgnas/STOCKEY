import ScrollableArea from "./ScrollableArea"

const ContentsBox = () => {
  const boxStyle = {
    width: "50%",
    height: "80vh",
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "24px 12px",
    margin: "36px auto",
  }

  return (
    <div style={boxStyle}>
      <h2>ContentsBox</h2>
      <ScrollableArea />
    </div>
  )
}

export default ContentsBox
