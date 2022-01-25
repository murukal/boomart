// next
import dynamic from 'next/dynamic'
// react
import { useEffect, useState } from 'react'
import { getBlogPublishRecord } from '../../../apis/blog'
// project
import { format, getCategories } from './assets'
// third
import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

dayjs.extend(dayOfYear)

export const Publish = () => {
  const [series, setSeries] = useState<number[]>([])

  const categories = getCategories()

  // 渲染数据
  // 博客的数量按照发布日期进行group
  useEffect(() => {
    getBlogPublishRecord(+dayjs(categories[0]), +dayjs(categories[categories.length - 1]).endOf('day')).then((res) => {
      setSeries(categories.map((timestamp) => res.data?.find((record) => record._id === dayjs(timestamp).dayOfYear())?.count || 0))
    })
  }, [])

  return (
    <Chart
      options={{
        title: {
          text: '最近一周在boom分享的文章数量',
          align: 'center'
        },
        xaxis: {
          categories: categories
        }
      }}
      series={[
        {
          data: series
        }
      ]}
      type='bar'
      width={400}
    />
  )
}

export default Publish
