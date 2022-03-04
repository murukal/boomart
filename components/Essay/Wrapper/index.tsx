// react
import { useMemo } from 'react'
// nextjs
import { useRouter } from 'next/router'
// mui
import { Card, CardMedia, CardContent, Typography } from '@mui/material'
// project
import Tags from '../Tags'
import Signature from '../Signature'
import Markers from '../Markers'
import type { Props } from './assets'
import type { Tag } from '../../../typings/tag'

const Wrapper = (props: Props) => {
  const router = useRouter()
  const essay = useMemo(() => props.essay, [props.essay])
  const tags = useMemo(() => props.essay.tags as Tag[], [props.essay])

  /** 路由跳转 */
  const onGo2Essay = (id: string) => () => {
    router.push(`/essay/${id}`)
  }

  return (
    <Card className='flex mt-7 bg-gray-50' key={essay._id} elevation={0}>
      <CardMedia
        className='rounded-r cursor-pointer'
        component='img'
        height={150}
        image={essay.cover || tags.at(0)?.cover}
        alt={essay.title}
        sx={{
          flex: 1
        }}
        onClick={onGo2Essay(essay._id)}
      />
      <CardContent
        className='px-4 self-center'
        sx={{
          flex: 2
        }}
      >
        <Tags className='mb-3' tags={tags} />

        {/* 文章标题 */}
        <Typography className='cursor-pointer' variant='h5' onClick={onGo2Essay(essay._id)}>
          {essay.title}
        </Typography>

        {/* 文章署名 */}
        <Signature className='mt-5' essay={essay} />
      </CardContent>

      <Markers />
    </Card>
  )
}

export default Wrapper
