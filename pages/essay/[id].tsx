// react
import { useMemo } from 'react'
// next
import Link from 'next/link'
import type { GetServerSideProps } from 'next'
// mui
import { Container, Box, Typography, Avatar, CardMedia, Card, CardContent } from '@mui/material'
// third
import dayjs from 'dayjs'
import ReactMarkdown from 'react-markdown'
// project
import Triggers from '../../components/Essay/Triggers'
import Comments from '../../components/Essay/Comments'
import { getEssayById } from '../../apis/essay'
import type { Essay } from '../../typings/essay'
import type { User } from '../../typings/user'
import type { Tag } from '../../typings/tag'

interface Props {
  essay: Essay
}

const Essay = (props: Props) => {
  const essay = useMemo(() => props.essay, [props.essay])

  const createdBy = useMemo(() => {
    return essay.createdBy as User
  }, [essay])

  const cover = useMemo(() => {
    return essay.cover || (essay.tags[0] as Tag | undefined)?.cover || ''
  }, [essay])

  return (
    <Container className='p-12'>
      {/* 抬头 */}
      <Typography className='font-black' variant='h1'>
        {essay.title}
      </Typography>

      {/* 著作信息 */}
      <Box className='mt-12 flex items-center'>
        <Avatar src={createdBy.avatar}></Avatar>

        <Box className='ml-4' color='#666'>
          <Box>
            <Typography component='span'>By </Typography>
            <Typography className='font-bold' component='span' color={(theme) => theme.palette.muted?.main}>
              {createdBy.username}
            </Typography>
          </Box>
          <Typography>{dayjs(essay.createdAt).format('YYYY MMM DD')}</Typography>
        </Box>
      </Box>

      {/* 封面 */}
      <CardMedia className='rounded-lg mt-12' component='img' height={600} image={cover} alt={essay.title} />

      {/* 文章正文 */}
      <ReactMarkdown className='mt-12'>{essay.content}</ReactMarkdown>

      {/* tags */}
      <Box className='mt-12 flex items-center'>
        <Typography fontSize={14} component='span'>
          Tags:
        </Typography>

        {essay.tags.map((tag) => (
          <Typography
            key={(tag as Tag)._id}
            className='ml-3'
            fontSize={14}
            fontStyle='italic'
            color={(theme) => theme.palette.muted?.main}
            component='span'
          >
            <Link href={`/category/${(tag as Tag)._id}`}>{(tag as Tag).name}</Link>
          </Typography>
        ))}

        <Triggers className='ml-auto' essayId={essay._id} />
      </Box>

      {/* 关于作者 */}
      <Card className='mt-12 p-7 flex'>
        <CardMedia className='rounded-full w-24 h-24' component='img' image={createdBy.avatar} />

        <CardContent
          className='ml-10'
          style={{
            padding: 0
          }}
        >
          <Typography variant='h4'>{createdBy.username}</Typography>

          <Typography className='mt-5'>关于作者</Typography>

          <Typography className='mt-4'>{createdBy.username}</Typography>

          <Typography className='mt-4' fontSize={14} fontStyle='italic' color={(theme) => theme.palette.muted?.main}>
            <Link href='/'>去看下 ta (125)</Link>
          </Typography>
        </CardContent>
      </Card>

      <Comments className='mt-12' comments={[]} />
    </Container>
  )
}

export default Essay

/** 服务端渲染 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context

  const { data: essay } = await getEssayById(params?.id as string)

  // 文章未找到，返回404
  if (!essay)
    return {
      notFound: true
    }

  return {
    props: {
      essay
    }
  }
}
