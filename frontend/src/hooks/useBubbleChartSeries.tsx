interface RawDataType {
  id: number
  name: string
  marketCap: number
}

interface SeriesType {
  name: string
  data: [
    {
      id: number
      name: string
      value: number
    }
  ]
  type: "packedbubble"
}

export const useBubbleChartSeries = (data: RawDataType[]) => {
  let series: SeriesType[] = []
  data?.forEach((item) => {
    const seriesItem: SeriesType = {
      name: item.name,
      data: [
        {
          id: item.id,
          name: item.name,
          value: item.marketCap,
        },
      ],
      type: "packedbubble",
    }
    series.push(seriesItem)
  })
  return series
}
