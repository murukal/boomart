// react
import { useMemo, useEffect } from 'react'
// next
import Link from 'next/link'
import type { GetServerSideProps } from 'next'
// mui
import { Container, Box, Typography, Avatar, CardMedia, Card, CardContent } from '@mui/material'
// third
import dayjs from 'dayjs'
import Beeeditor from '@fantufantu/beeeditor'
// project
import Toggles from '~/components/Essay/Toggles'
import Comments from '~/components/Essay/Comments'
import { getEssay } from '~/apis/essay'
import { create, TargetType, Type } from '~/apis/toggle'
import type { Essay } from '~/typings/essay'

interface Props {
  essay: Essay
}

const Essay = (props: Props) => {
  const essay = useMemo(() => props.essay, [props.essay])

  const createdBy = useMemo(() => {
    return essay.createdBy
  }, [essay])

  const cover = useMemo(() => {
    return essay.cover || essay.tags.at(0)?.image
  }, [essay])

  /** 页面渲染触发 */
  useEffect(() => {
    create({
      targetId: essay.id,
      targetType: TargetType.Essay,
      type: Type.Browse
    })
  }, [])

  return (
    <Container className='p-12'>
      {/* 抬头 */}
      <Typography className='font-black' variant='h1'>
        {essay.title}
      </Typography>

      {/* 著作信息 */}
      <Box className='mt-12 flex items-center'>
        <Avatar src={createdBy.avatar} />

        <Box className='ml-4' color='#666'>
          <Box>
            <Typography component='span'>By</Typography>
            <Typography className='font-bold ml-1' component='span' color={(theme) => theme.palette.muted?.main}>
              {createdBy.username}
            </Typography>
          </Box>
          <Typography>{dayjs(essay.createdAt).format('YYYY MMM DD')}</Typography>
        </Box>
      </Box>

      {/* 封面 */}
      <CardMedia className='rounded-lg mt-12' component='img' height={500} image={cover} alt={essay.title} />

      {/* 文章正文 */}
      <Beeeditor defaultValue={essay.content} isReadonly={true} />

      {/* tags */}
      <Box className='mt-12 flex items-center'>
        <Typography fontSize={14} component='span'>
          Tags:
        </Typography>

        {essay.tags.map((tag) => (
          <Typography
            key={tag.id}
            className='ml-3'
            fontSize={14}
            fontStyle='italic'
            color={(theme) => theme.palette.muted?.main}
            component='span'
          >
            <Link href={`/category/${tag.id}`}>{tag.name}</Link>
          </Typography>
        ))}

        <Toggles className='ml-auto' essayId={essay.id} />
      </Box>

      {/* 关于作者 */}
      <Card className='mt-12 p-7 flex'>
        <Avatar className='w-24 h-24' src={createdBy.avatar} />

        <CardContent
          className='ml-10'
          style={{
            padding: 0
          }}
        >
          <Typography variant='h4'>{createdBy.username}</Typography>

          <Typography className='mt-5'>这个人有点懒，没有介绍自己</Typography>

          <Typography className='mt-4' fontSize={14} fontStyle='italic' color={(theme) => theme.palette.muted?.main}>
            <Link href='/'>{`去看下 ta ( ${createdBy.creationCount} )`}</Link>
          </Typography>
        </CardContent>
      </Card>

      <Comments className='mt-12' targetType={TargetType.Essay} targetId={essay.id} />
    </Container>
  )
}

export default Essay

/**
 * 服务端渲染
 */
export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  if (!params?.id)
    return {
      notFound: true
    }

  const { data } = await getEssay(Number(params?.id))

  if (!data?.essay) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      essay: data?.essay
    }
  }
}
