// next
import dynamic from 'next/dynamic'
// react
import { useEffect, useState } from 'react'
import { getBlogPublishRecord } from '../../../apis/blog'
// project
import { getCategories } from './assets'
// third
import dayjs from 'dayjs'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const Publish = () => {
  const [series, setSeries] = useState([])

  const categories = getCategories()

  // 渲染数据
  // 博客的数量按照发布日期进行group
  useEffect(() => {
    getBlogPublishRecord(+dayjs(categories[0]), +dayjs(categories[categories.length - 1]))
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
      width={500}
      height={320}
    />
  )
}

export default Publish
