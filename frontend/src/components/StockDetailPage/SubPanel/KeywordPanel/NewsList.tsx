import NewsListItem from "./NewsListItem"
import NewsThumbnail from "./NewsThumbnail"

export interface NewsProps {
  title: string
  date: string
  url: string
}

const NewsList = ({ newsList }: { newsList: NewsProps[] }) => {
  return (
    <>
      {newsList !== undefined &&
        newsList.map((news, index) => (
          // <NewsListItem key={`news-${index}}`} news={news} order={index + 1} />
          <NewsThumbnail  key={`news-${index}}`} news={news} order={index + 1}/>
        ))}
    </>
  )
}

export default NewsList
